window.addEventListener('load', function () {
    // Canvas setup
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');

    canvas.width = 1500;
    canvas.height = 500;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', (e) => {
                if (
                    (
                        e.key == 'ArrowUp' ||
                        e.key == 'ArrowDown' ||
                        e.key == 'ArrowLeft' ||
                        e.key == 'ArrowRight' ||
                        e.key == ' '
                    ) && !this.game.keys.includes(e.key)
                ) {
                    this.game.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', (e) => {
                if (this.game.keys.includes(e.key)) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 7;
            this.speed = 10;
            this.markForDeletion = false;
        }

        update() {
            this.x += this.speed;

            if (this.x > this.game.width - this.width) {
                this.markForDeletion = true;
            }
        }

        draw(context) {
            context.fillStyle = 'orange';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Particle {

    }

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedX = 0;
            this.speedY = 0;
            this.speed = 5;
            this.projectiles = [];
        }

        update() {
            this.speedX = 0;
            this.speedY = 0;

            if (this.game.keys.indexOf('ArrowUp') >= 0) {
                this.speedY = -this.speed;
            }
            if (this.game.keys.indexOf('ArrowDown') >= 0) {
                this.speedY = this.speed;
            }
            if (this.game.keys.indexOf('ArrowLeft') >= 0) {
                this.speedX = -this.speed;
            }
            if (this.game.keys.indexOf('ArrowRight') >= 0) {
                this.speedX = this.speed;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.game.keys.indexOf(' ') >= 0) {
                this.shootTop();
                this.game.keys.splice(this.game.keys.indexOf(' '), 1);
            }

            this.projectiles.forEach(projectile => projectile.update());
            this.projectiles = this.projectiles.filter(projectile => !projectile.markForDeletion);
        }

        draw(context) {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);

            this.projectiles.forEach(projectile => projectile.draw(context));
        }

        shootTop() {
            if (this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 40));
                this.game.ammo--;
            }
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * 1.5 + 0.5;
            this.markForDeletion = false;
        }

        update() {
            this.x -= this.speedX;
            if (this.x + this.width < 0) {
                this.markForDeletion = true;
            }
        }

        draw(context) {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Angler1 extends Enemy {
        constructor(game) {
            super(game);
            this.width = 228 * 0.2;
            this.height = 169 * 0.2;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
        }
    }

    class Layer {

    }

    class Background {

    }

    class UI {
        constructor(game) {
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helveltica';

            this.ammoBar = {
                x: 20,
                y: 50,
                width: 10,
                height: 10,
                color: 'yellow',
                backgroundColor: 'gray'
            };
        }

        draw(context) {
            this.drawAmmoBar(context);
        }
        
        drawAmmoBar(context) {
            context.fillStyle = this.ammoBar.backgroundColor;
            
            context.fillRect(
                this.ammoBar.x, 
                this.ammoBar.y, 
                this.ammoBar.width * this.game.maxAmmo, 
                this.ammoBar.height);

            context.fillStyle = this.ammoBar.color;

            for (let i = 0; i < this.game.ammo; i++) {
                context.fillRect(
                    this.ammoBar.x + this.ammoBar.width * i, 
                    this.ammoBar.y, 
                    this.ammoBar.width, 
                    this.ammoBar.height);
            }
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.keys = [];
            this.inputHandler = new InputHandler(this);
            this.ui = new UI(this);
            this.player = new Player(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.ammo = 50;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.gameOver = false;
        }

        update(deltaTime) {
            this.player.update();

            if (this.ammoTimer > this.ammoInterval) {
                if (this.ammo < this.maxAmmo) {
                    this.ammo++;
                }
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }

            this.enemies.forEach(enemy => enemy.update());
            this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);

            if (!this.gameOver && this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
                console.log(this.enemies);
            } else {
                this.enemyTimer += deltaTime;
            }

        }

        draw(context) {
            this.player.draw(context);
            this.ui.draw(context);
            this.enemies.forEach(enemy => enemy.draw(context));
        }

        addEnemy() {
            this.enemies.push(new Angler1(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    var animate = function (timesTamp) {
        const deltaTime = timesTamp - lastTime;
        lastTime = timesTamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    };

    animate(0);
});

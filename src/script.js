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
        static fillStyle = 'red';
        static width = 10;
        static height = 7;
        static speed = 1000;

        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = Projectile.width;
            this.height = Projectile.height;
            this.speed = Projectile.speed;
            this.markForDeletion = false;
        }

        update(deltaTimeSeconds) {
            this.x += this.speed * deltaTimeSeconds;

            if (this.x > this.game.width - this.width) {
                this.markForDeletion = true;
            }
        }

        draw(context) {
            context.fillStyle = Projectile.fillStyle;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Particle {

    }

    class Player {
        static fillStyle = 'black';
        static width = 120;
        static height = 190;
        static x = 20;
        static y = 100;
        static speed = 200;

        constructor(game) {
            this.game = game;
            this.width = Player.width;
            this.height = Player.height;
            this.x = Player.x;
            this.y = Player.y;
            this.speedX = 0;
            this.speedY = 0;
            this.speed = Player.speed;
            this.projectiles = [];
            this.sizeX = this.game.width - this.width;
            this.sizeY = this.game.height - this.height;
        }

        update(deltaTimeSeconds) {
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

            this.x += this.speedX * deltaTimeSeconds;
            this.y += this.speedY * deltaTimeSeconds;

            if (this.x < 0) this.x = 0;
            if (this.x > this.sizeX) this.x = this.sizeX;
            if (this.y < 0) this.y = 0;
            if (this.y > this.sizeY) this.y = this.sizeY;

            if (this.game.keys.indexOf(' ') >= 0) {
                this.shootTop();
                this.game.keys.splice(this.game.keys.indexOf(' '), 1);
            }

            this.projectiles.forEach(projectile => projectile.update(deltaTimeSeconds));
            this.projectiles = this.projectiles.filter(projectile => !projectile.markForDeletion);
        }

        draw(context) {
            context.fillStyle = Player.fillStyle;
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillRect(this.x + this.width, this.y + 40, 20, 10);
            
            this.projectiles.forEach(projectile => projectile.draw(context));
        }

        shootTop() {
            if (this.game.ammunition > 0) {
                this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 40));
                this.game.ammunition--;
            }
        }
    }

    class Enemy {
        static lives = 1;
        static font = '20px Helveltica';

        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * 90 + 30;
            this.markForDeletion = false;
            this.lives = Enemy.lives;
            this.score = this.lives;
        }

        update(deltaTimeSeconds) {
            this.x -= this.speedX * deltaTimeSeconds;
            if (this.x + this.width < 0) {
                this.markForDeletion = true;
            }
        }

        draw(context) {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.font = Enemy.font;
            context.fillText(this.lives, this.x, this.y);
        }
    }

    class Angler1 extends Enemy {
        static width = 228 * 0.2;
        static height = 169 * 0.2;
        static lives = 3;

        constructor(game) {
            super(game);
            this.width = Angler1.width;
            this.height = Angler1.height;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.lives = Angler1.lives;
        }
    }

    class Layer {

    }

    class Background {

    }

    class UI {
        static fontSize = 25;
        static fontFamily = 'Helveltica';
        static ammunitionBar = {
            x: 20,
            y: 50,
            width: 10,
            height: 10,
            color: 'yellow',
            backgroundColor: 'gray'
        };

        constructor(game) {
            this.game = game;
            this.fontSize = UI.fontSize;
            this.fontFamily = UI.fontFamily;
            this.ammunitionBar = UI.ammunitionBar;
        }

        draw(context) {
            this.drawAmmunitionBar(context);
            this.drawScore(context);
        }

        drawAmmunitionBar(context) {
            context.fillStyle = this.ammunitionBar.backgroundColor;

            context.fillRect(
                this.ammunitionBar.x,
                this.ammunitionBar.y,
                this.ammunitionBar.width * this.game.maxAmmunition,
                this.ammunitionBar.height);

            context.fillStyle = this.ammunitionBar.color;

            for (let i = 0; i < this.game.ammunition; i++) {
                context.fillRect(
                    this.ammunitionBar.x + this.ammunitionBar.width * i,
                    this.ammunitionBar.y,
                    this.ammunitionBar.width,
                    this.ammunitionBar.height);
            }
        }

        drawScore(context) {
            context.fillStyle = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText('Score: ' + this.game.score, 20, 100);
            if (this.game.gameOver) {
                context.textAlign = 'center';
                context.fillStyle = 'red';
                context.font = '50px ' + this.fontFamily;
                context.fillText('GAME OVER', this.game.width / 2, this.game.height / 2);
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
            this.enemyInterval = 2;
            this.ammunition = 50;
            this.maxAmmunition = 50;
            this.ammunitionTimer = 0;
            this.ammunitionInterval = 0.4;
            this.gameOver = false;
            this.score = 0;
        }

        update(deltaTimeSeconds) {
            this.player.update(deltaTimeSeconds);
        
            if (this.ammunitionTimer > this.ammunitionInterval) {
                if (this.ammunition < this.maxAmmunition) {
                    this.ammunition++;
                }
                this.ammunitionTimer = 0;
            } else {
                this.ammunitionTimer += deltaTimeSeconds;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTimeSeconds);
                if (this.checkCollision(this.player, enemy)) {
                    enemy.markForDeletion = true;
                    this.score -= enemy.score;
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)) {
                        projectile.markForDeletion = true;
                        enemy.lives--;
                        if (enemy.lives > 0) return;
                        
                        enemy.markForDeletion = true;
                        this.score += enemy.score;
                    }
                });
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);

            if (!this.gameOver && this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTimeSeconds;
            }

            if (this.score < 0) {
                this.gameOver = true;
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

        checkCollision(rect1, rect2) {
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y
            );
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    var animate = function (timesTamp) {
        const deltaTime = timesTamp - lastTime;
        lastTime = timesTamp;

        const deltaTimeSeconds = deltaTime / 1000;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTimeSeconds);
        game.draw(ctx);
        requestAnimationFrame(animate);
    };

    animate(0);
});

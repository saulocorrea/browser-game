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
                )
                {
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
            this.speed = 3;
            this.markForDeletion = false;
        }

        update() {
            this.x += this.speed;
            
            if (this.x > this.game.width - this.width) {
                this.markForDeletion = true;
            }
        }

        draw(context) {
            context.fillStyle = 'red';
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
            this.velocity = 5;
            this.projectiles = [];
        }
    
        update() {
            this.speedX = 0;
            this.speedY = 0;

            if (this.game.keys.indexOf('ArrowUp') >= 0) {
                this.speedY = -this.velocity;
            }
            if (this.game.keys.indexOf('ArrowDown') >= 0) {
                this.speedY = this.velocity;
            }
            if (this.game.keys.indexOf('ArrowLeft') >= 0) {
                this.speedX = -this.velocity;
            }
            if (this.game.keys.indexOf('ArrowRight') >= 0) {
                this.speedX = this.velocity;
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
            this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 40));
        }
    }
    
    class Enemy {
    
    }
    
    class Layer {
    
    }
    
    class Background {
    
    }
    
    class UI {
    
    }
    
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.keys = [];
            this.inputHandler = new InputHandler(this);
            this.player = new Player(this);
        }
    
        update() {
            this.player.update();
        }
    
        draw(context) {
            this.player.draw(context);
        }
    }
    

    const game = new Game(canvas.width, canvas.height);

    var animate = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    };

    animate();
});

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
                if (!this.game.keys.includes(e.key)) {
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
        }
    
        update() {
            this.speedX = 0;
            this.speedY = 0;

            if (this.game.keys.indexOf('ArrowUp') >= 0) {
                this.speedY = this.velocity * -1;
            }
            if (this.game.keys.indexOf('ArrowDown') >= 0) {
                this.speedY = this.velocity;
            }
            if (this.game.keys.indexOf('ArrowLeft') >= 0) {
                this.speedX = this.velocity * -1;
            }
            if (this.game.keys.indexOf('ArrowRight') >= 0) {
                this.speedX = this.velocity;
            }

            this.x += this.speedX;
            this.y += this.speedY;
        }
    
        draw(context) {
            context.fillRect(this.x, this.y, this.width, this.height);
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

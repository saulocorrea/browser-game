import Game from './src/core/Game.js';
import Player from './src/game/Player.js';
import Angler1 from './src/game/Angler1.js';
import { checkCollision } from './src/core/Collision.js';

window.addEventListener('load', function () {
    // Canvas setup
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');

    canvas.width = 1500;
    canvas.height = 500;

    class Particle {

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

    class ShooterGame extends Game {
        constructor(width, height) {
            super(width, height);
            
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
                if (checkCollision(this.player, enemy)) {
                    enemy.markForDeletion = true;
                    this.score -= enemy.score;
                }
                this.player.projectiles.forEach(projectile => {
                    if (checkCollision(projectile, enemy)) {
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
    }

    const game = new ShooterGame(canvas.width, canvas.height);
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

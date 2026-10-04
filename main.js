import Game from './src/core/Game.js';
import Player from './src/game/Player.js';
import BasicEnemy from './src/game/BasicEnemy.js';
import UI from './src/game/UI.js';
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
            this.enemies.push(new BasicEnemy(this));
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

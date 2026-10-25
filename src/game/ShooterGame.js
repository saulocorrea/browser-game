//https://youtu.be/7BHs1BzA4fs?si=OE1xLNO7ocUWf8DZ&t=3309

import Game from '../core/Game.js';
import { checkCollision } from '../core/Collision.js';
import Background from '../game/Background.js';

import UI from '../game/UI.js';
import Player from '../game/Player.js';
import BasicEnemy from '../game/BasicEnemy.js';
import IntermediateEnemy from '../game/IntermediateEnemy.js';

export default class ShooterGame extends Game {
    constructor(width, height) {
        super(width, height);
        
        this.background = new Background(this);
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
        this.gameTimer = 0;
        this.gameTimerLimit = 20000;
        this.score = 0;
        this.speed = 1;
    }

    update(deltaTimeSeconds) {
        if (!this.gameOver) { 
            this.gameTimer += deltaTimeSeconds;
        }
        if (this.gameTimer > this.gameTimerLimit) {
            this.gameOver = true;
        }
        if (this.gameOver) return;

        this.background.update();
        this.background.layer4.update();
        this.player.update(deltaTimeSeconds);
    
        this.ammunitionTimer += deltaTimeSeconds;

        while (this.ammunitionTimer + 1e-9 >= this.ammunitionInterval) {
            this.ammunitionTimer = Math.max(
                0,
                this.ammunitionTimer - this.ammunitionInterval
            );

            if (this.ammunition < this.maxAmmunition) {
                this.ammunition++;
            } else {
                this.ammunitionTimer = 0;
                break;
            }
        }

        this.enemies.forEach(enemy => {
            if (this.gameOver) return;

            enemy.update(deltaTimeSeconds);

            if (enemy.markForDeletion) return;

            if (checkCollision(this.player, enemy)) {
                enemy.markForDeletion = true;
                this.score -= enemy.score;

                if (this.score < 0) {
                    this.gameOver = true;
                }
                return;
            }

            this.player.projectiles.forEach(projectile => {
                if (projectile.markForDeletion || enemy.markForDeletion) {
                    return;
                }

                if (checkCollision(projectile, enemy)) {
                    projectile.markForDeletion = true;
                    enemy.lives--;

                    if (enemy.lives <= 0) {
                        enemy.markForDeletion = true;
                        this.score += enemy.score;
                    }
                }
            });
        });

        this.player.projectiles = this.player.projectiles.filter(
            projectile => !projectile.markForDeletion
        );

        this.enemies = this.enemies.filter(
            enemy => !enemy.markForDeletion
        );

        if (!this.gameOver) {
            this.enemyTimer += deltaTimeSeconds;

            while (this.enemyTimer + 1e-9 >= this.enemyInterval) {
                this.enemyTimer = Math.max(
                    0,
                    this.enemyTimer - this.enemyInterval
                );

                this.addEnemy();
            }
        }
    }

    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        this.enemies.forEach(enemy => enemy.draw(context));
        this.ui.draw(context);
        this.background.layer4.draw(context);
    }

    addEnemy() {
        const randomize = Math.random();
        if (randomize < 0.5) {
            this.enemies.push(new BasicEnemy(this));
        } else {
            this.enemies.push(new IntermediateEnemy(this));
        }
    }
}
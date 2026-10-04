import Game from '../core/Game.js';
import { checkCollision } from '../core/Collision.js';

import UI from '../game/UI.js';
import Player from '../game/Player.js';
import BasicEnemy from '../game/BasicEnemy.js';

export default class ShooterGame extends Game {
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
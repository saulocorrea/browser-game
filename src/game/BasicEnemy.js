import Enemy from './Enemy.js';

export default class BasicEnemy extends Enemy {
    static width = 228 * 0.2;
    static height = 169 * 0.2;
    static lives = 3;

    constructor(game) {
        super(game);
        this.width = BasicEnemy.width;
        this.height = BasicEnemy.height;
        const minY = this.game.height * 0.9 - this.height;
        const maxY = this.game.height * 0.7;
        this.y = (Math.random() * minY);
        if (this.y < minY) {
            this.y += 50;
        }
        if (this.y > maxY) {
            this.y = maxY;
        }
        this.lives = BasicEnemy.lives;
   }
}
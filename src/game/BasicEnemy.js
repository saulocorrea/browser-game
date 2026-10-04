import Enemy from './Enemy.js';

export default class BasicEnemy extends Enemy {
    static width = 228 * 0.2;
    static height = 169 * 0.2;
    static lives = 3;

    constructor(game) {
        super(game);
        this.width = BasicEnemy.width;
        this.height = BasicEnemy.height;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.lives = BasicEnemy.lives;
    }
}
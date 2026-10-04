import Enemy from './Enemy.js';

export default class Angler1 extends Enemy {
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
import Enemy from './Enemy.js';

export default class IntermediateEnemy extends Enemy {
    static width = 213;
    static height = 165;
    static lives = 3;

    constructor(game) {
        super(game);
        this.width = IntermediateEnemy.width;
        this.height = IntermediateEnemy.height;
        const minY = this.game.height * 0.9 - this.height;
        const maxY = this.game.height * 0.7;
        this.y = (Math.random() * minY);
        if (this.y < minY) {
            this.y += 50;
        }
        if (this.y > maxY) {
            this.y = maxY;
        }
        this.lives = IntermediateEnemy.lives;

        this.image = document.getElementById('angler2');
        this.frameY = Math.floor(Math.random() * 2);
   }

    draw(context) {
        context.fillStyle = 'white';
        super.draw(context);
    }
}
import Enemy from './Enemy.js';

export default class BasicEnemy extends Enemy {
    static width = 228;
    static height = 169;
    static lives = 1;

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

        this.image = document.getElementById('angler1');
        this.frameY = Math.floor(Math.random() * 3);
   }

   draw(context) {
        context.fillStyle = 'yellow';
        super.draw(context);
    }
}
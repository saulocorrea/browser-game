export default class Enemy {
    static lives = 1;
    static font = '20px Helvetica';

    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * 90 + 30;
        this.markForDeletion = false;
        this.lives = Enemy.lives;
        this.score = this.lives;
    }

    update(deltaTimeSeconds) {
        this.x -= this.speedX * deltaTimeSeconds;
        if (this.x + this.width < 0) {
            this.markForDeletion = true;
        }
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'black';
        context.font = Enemy.font;
        context.fillText(this.lives, this.x, this.y);
    }
}
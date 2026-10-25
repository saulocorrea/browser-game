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
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
    }

    update(deltaTimeSeconds) {
        this.x -= this.speedX * deltaTimeSeconds;
        if (this.x + this.width < 0) {
            this.markForDeletion = true;
        }
        //sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(
            this.image, 
            this.frameX * this.width, 
            this.frameY * this.height, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height);

        context.font = Enemy.font;
        context.fillText(this.lives, this.x + 15, this.y + 25);
    }
}
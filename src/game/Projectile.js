export default class Projectile {
    static fillStyle = 'red';
    static width = 40;
    static height = 15;
    static speed = 1000;

    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = Projectile.width;
        this.height = Projectile.height;
        this.speed = Projectile.speed;
        this.markForDeletion = false;
        this.image = document.getElementById('projectile');
    }

    update(deltaTimeSeconds) {
        this.x += this.speed * deltaTimeSeconds;

        if (this.x > this.game.width - this.width) {
            this.markForDeletion = true;
        }
    }

    draw(context) {
        context.fillStyle = Projectile.fillStyle;
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
import Projectile from './Projectile.js';

export default class Player {
    static fillStyle = 'black';
    static width = 120;
    static height = 190;
    static x = 20;
    static y = 100;
    static speed = 200;

    constructor(game) {
        this.game = game;
        this.width = Player.width;
        this.height = Player.height;
        this.x = Player.x;
        this.y = Player.y;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = Player.speed;
        this.projectiles = [];
        this.sizeX = this.game.width - this.width;
        this.sizeY = this.game.height - this.height;
    }

    update(deltaTimeSeconds) {
        this.speedX = 0;
        this.speedY = 0;

        const keys = this.game.inputHandler.keys;

        if (keys.includes('ArrowUp')) {
            this.speedY = -this.speed;
        }
        if (keys.includes('ArrowDown')) {
            this.speedY = this.speed;
        }
        if (keys.includes('ArrowLeft')) {
            this.speedX = -this.speed;
        }
        if (keys.includes('ArrowRight')) {
            this.speedX = this.speed;
        }

        this.x += this.speedX * deltaTimeSeconds;
        this.y += this.speedY * deltaTimeSeconds;

        if (this.x < 0) this.x = 0;
        if (this.x > this.sizeX) this.x = this.sizeX;
        if (this.y < 0) this.y = 0;
        if (this.y > this.sizeY) this.y = this.sizeY;

        if (keys.includes(' ')) {
            this.shootTop();
            this.game.inputHandler.keys.splice(this.game.inputHandler.keys.indexOf(' '), 1);
        }

        this.projectiles.forEach(projectile => projectile.update(deltaTimeSeconds));
        this.projectiles = this.projectiles.filter(projectile => !projectile.markForDeletion);
    }

    draw(context) {
        context.fillStyle = Player.fillStyle;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillRect(this.x + this.width, this.y + 40, 20, 10);
        
        this.projectiles.forEach(projectile => projectile.draw(context));
    }

    shootTop() {
        if (this.game.ammunition > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 40));
            this.game.ammunition--;
        }
    }
}
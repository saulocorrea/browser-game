export default class UI {
    static fontSize = 25;
    static fontFamily = 'Helvetica';
    static ammunitionBar = {
        x: 20,
        y: 50,
        width: 10,
        height: 10,
        color: 'yellow',
        backgroundColor: 'gray'
    };

    constructor(game) {
        this.game = game;
        this.fontSize = UI.fontSize;
        this.fontFamily = UI.fontFamily;
        this.ammunitionBar = UI.ammunitionBar;
    }

    draw(context) {
        this.drawAmmunitionBar(context);
        this.drawScore(context);
    }

    drawAmmunitionBar(context) {
        context.fillStyle = this.ammunitionBar.backgroundColor;

        context.fillRect(
            this.ammunitionBar.x,
            this.ammunitionBar.y,
            this.ammunitionBar.width * this.game.maxAmmunition,
            this.ammunitionBar.height);

        context.fillStyle = this.ammunitionBar.color;

        for (let i = 0; i < this.game.ammunition; i++) {
            context.fillRect(
                this.ammunitionBar.x + this.ammunitionBar.width * i,
                this.ammunitionBar.y,
                this.ammunitionBar.width,
                this.ammunitionBar.height);
        }
    }

    drawScore(context) {
        context.fillStyle = 'black';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText('Score: ' + this.game.score, 20, 100);
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'red';
            context.font = '50px ' + this.fontFamily;
            context.fillText('GAME OVER', this.game.width / 2, this.game.height / 2);
        }
    }
}

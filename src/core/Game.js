export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.inputHandler = new InputHandler();
    }

    update(deltaTime) {}

    draw(context) {}
}
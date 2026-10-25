import InputHandler from './InputHandler.js';

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.inputHandler = new InputHandler();
        this.debug = false;
    }

    update(deltaTime) {}

    draw(context) {}
}
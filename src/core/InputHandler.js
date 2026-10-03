export default class InputHandler {
    constructor() {
        this.keys = [];

        window.addEventListener('keydown', (event) => {
            if (!this.keys.includes(event.key)) {
                this.keys.push(event.key);
            }
        });

        window.addEventListener('keyup', (event) => {
            const index = this.keys.indexOf(event.key);

            if (index >= 0) {
                this.keys.splice(index, 1);
            }
        });
    }
}
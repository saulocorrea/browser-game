import ShooterGame from './src/game/ShooterGame.js';

window.addEventListener('load', function () {
    // Canvas setup
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');

    canvas.width = 1500;
    canvas.height = 500;

    class Particle {

    }

    class Layer {

    }

    class Background {

    }

    const game = new ShooterGame(canvas.width, canvas.height);
    let lastTime = 0;

    var animate = function (timesTamp) {
        const deltaTime = timesTamp - lastTime;
        lastTime = timesTamp;

        const deltaTimeSeconds = deltaTime / 1000;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTimeSeconds);
        game.draw(ctx);
        requestAnimationFrame(animate);
    };

    animate(0);
});

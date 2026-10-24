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
    let lastTime = null;

    document.addEventListener('visibilitychange', () => {
        lastTime = null;
        game.inputHandler.keys.length = 0;
    });

    const animate = function (timestamp) {
        const deltaTimeSeconds = lastTime === null || document.hidden
            ? 0
            : Math.min((timestamp - lastTime) / 1000, 0.1);

        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTimeSeconds);
        game.draw(ctx);

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
});

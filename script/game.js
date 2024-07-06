import { canvas, ctx, GAME_STATE, tileSize, layout, bricks } from './config.js';
import { player } from './player.js';
import { ghosts, moveGhosts, drawGhosts } from './ghost.js';
import { drawBoard, dilate } from './board.js';
import { collision } from './collision.js';

function pause() {
    GAME_STATE.paused = true;
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].stop();
    }
    player.stop();
}

function resume() {
    GAME_STATE.paused = false;
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].vx = 4;
        ghosts[i].vy = 4;
    }
    player.vx = 2.5;
    player.vy = 2.5;
    window.requestAnimationFrame(update); // Resume the game loop
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.font = "1.5rem Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: " + GAME_STATE.score, 10, canvas.height);
}

function drawLives() {
    const positions = [
        canvas.width / 2 - tileSize,
        canvas.width / 2,
        canvas.width / 2 + tileSize
    ];
    const lives = {
        x: 100,
        y: canvas.height - GAME_STATE.playerRadius
    }
    for (let i = 0; i < GAME_STATE.lives; i++) {
        lives.x = positions[i];
        ctx.beginPath();
        ctx.arc(lives.x, lives.y, GAME_STATE.playerRadius, 0.25 * Math.PI, 1.25 * Math.PI, false);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lives.x, lives.y, GAME_STATE.playerRadius, 0.75 * Math.PI, 1.75 * Math.PI, false);
        ctx.fill();
    }
}

function update() {
    if (GAME_STATE.paused) {
        return; // Stop updating if the game is paused
    }

    player.updatePosition(layout);

    clearCanvas();
    drawBoard();
    drawGhosts();
    moveGhosts();
    drawScore();
    drawLives();

    player.draw(ctx, tileSize);
    collision();
    window.requestAnimationFrame(update);
}

function resetGameState() {
    // Reset player position
    player.x = canvas.width / 2 + 16;
    player.y = canvas.height / 2 + 25;
    player.direction = "right";
    player.isDead = false;

    // Reset ghosts positions and states
    const ghostStartPositions = [
        { x: canvas.width / 2 + 140, y: canvas.height / 2 + 20 },
        { x: canvas.width / 2 - 120, y: canvas.height / 2 - 200 },
        { x: canvas.width / 2 - 40, y: canvas.height / 2 - 10 },
        { x: canvas.width / 2, y: canvas.height / 2 - 250 },
        { x: canvas.width / 2 + 60, y: canvas.height / 2 - 10 }
    ];

    ghosts.forEach((ghost, index) => {
        ghost.x = ghostStartPositions[index].x;
        ghost.y = ghostStartPositions[index].y;
        ghost.direction = "right";
        ghost.vx = 4;
        ghost.vy = 4;
        ghost.isScared = false;
        ghost.isEatable = false;
    });

    // Reset game state
    GAME_STATE.score = 0;
    GAME_STATE.lives = 3;
    GAME_STATE.pelletsEaten = 0;
    GAME_STATE.leftPressed = false;
    GAME_STATE.rightPressed = false;
    GAME_STATE.upPressed = false;
    GAME_STATE.downPressed = false;

    // Reset pellets
    for (let c = 0; c < layout.length; c++) {
        for (let r = 0; r < layout[c].length; r++) {
            if (bricks[c][r].type === "pellet" || bricks[c][r].type === "powerPellet") {
                bricks[c][r].isEaten = false;
            }
        }
    }
}

function playAgain() {
    if (document.querySelector(".gameOver").style.display == "block") {
        document.querySelector(".gameOver").style.display = "none";
    } else {
        document.querySelector(".gameWin").style.display = "none";
    }

    document.querySelector("#board-container").style.filter = "none";
    document.querySelector("#board-container").style.display = "block";

    resetGameState();
    // update();
}

// Initialize the game
window.requestAnimationFrame(update);
dilate();

window.playAgain = playAgain;  // Make the playAgain function accessible globally

export { pause, resume, update, resetGameState };

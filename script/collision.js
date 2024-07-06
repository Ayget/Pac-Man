import { GAME_STATE, layout, bricks, canvas, tileSize } from './config.js';
import { player } from './player.js';
import { ghosts } from './ghost.js';

var board = document.querySelector("#board-container");
var gameOverDisplay = document.querySelector(".gameOver");
var gameWinDisplay = document.querySelector(".gameWin");

var interval;
var seconds = 4;

function collision() {
    for (let c = 0; c < layout.length; c++) {
        for (let r = 0; r < layout[c].length; r++) {
            let b = bricks[c][r];

            // Check if ghost collides with walls & pacman
            for (let i = 0; i < ghosts.length; i++) {
                if (ghosts[i].x + ghosts[i].radius > b.x && ghosts[i].x < b.x + tileSize + ghosts[i].radius && ghosts[i].y + ghosts[i].radius > b.y - 5 && ghosts[i].y < b.y + tileSize + ghosts[i].radius && b.type === "wall") {
                    ghosts[i].x = ghosts[i].prevPos.x;
                    ghosts[i].y = ghosts[i].prevPos.y;
                    ghosts[i].changeDirection();
                }
                // Check if player collides with ghost
                if (player.x + GAME_STATE.playerRadius > ghosts[i].x && player.x < ghosts[i].x + tileSize && player.y + GAME_STATE.playerRadius > ghosts[i].y && player.y < ghosts[i].y + tileSize && !player.isDead) {
                    if (!ghosts[i].isScared) {
                        player.isDead = true;

                        ghosts[i].x = ghosts[i].prevPos.x;
                        ghosts[i].y = ghosts[i].prevPos.y;
                        player.x = player.prevPos.x;
                        player.y = player.prevPos.y;
                        GAME_STATE.lives -= 1;
                        checkGameOver();
                    } else if (ghosts[i].isEatable) {
                        ghosts[i].isEatable = false;
                        ghosts[i].x = canvas.width / 2;
                        ghosts[i].y = canvas.height / 2 - 76;
                        ghosts[i].direction = "right";
                        GAME_STATE.score += 200;
                    }
                }
            }

            // Check if player collides with wall
            if (player.x + GAME_STATE.playerRadius > b.x && player.x < b.x + tileSize + GAME_STATE.playerRadius && player.y > b.y - GAME_STATE.playerRadius && player.y < b.y + tileSize + GAME_STATE.playerRadius) {
                if (b.type === "wall") {
                    if (GAME_STATE.leftPressed) {
                        player.x += player.vx;
                    }
                    if (GAME_STATE.rightPressed) {
                        player.x -= player.vx;
                    }
                    if (GAME_STATE.upPressed) {
                        player.y += player.vy;
                    }
                    if (GAME_STATE.downPressed) {
                        player.y -= player.vy;
                    }
                }
            }

            // Check if player collides with pellets and powerPellets
            if (player.x + GAME_STATE.playerRadius > b.x && player.x < b.x + GAME_STATE.playerRadius && player.y > b.y - GAME_STATE.playerRadius && player.y < b.y + GAME_STATE.playerRadius && !b.isEaten) {
                if (b.type === "pellet" || b.type === "powerPellet") {
                    b.isEaten = true;
                    GAME_STATE.score += 10;
                    GAME_STATE.pelletsEaten += 10;
                    checkGameWin();
                    if (b.type === "powerPellet") {
                        for (let i = 0; i < ghosts.length; i++) {
                            if (ghosts[i].isScared) {
                                interval = clearTimeout(interval);
                                interval = setTimeout(unScareGhost, 10000);
                            } else {
                                ghosts[i].isScared = true;
                                ghosts[i].isEatable = true;
                                interval = setTimeout(unScareGhost, 10000);
                            }
                        }
                    }
                }
            }

            if (player.x > canvas.width) {
                player.x = 1;
            } else if (player.x < 1) {
                player.x = canvas.width - 1;
            }
        }
    }
}

function unScareGhost() {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].isScared = false;
    }
}

function checkGameOver() {
    if (player.isDead) {
        console.log("live lost");
        player.isDead = false;
        player.x = canvas.width / 2 + 16;
        player.y = canvas.height / 2 + 25;

        if (GAME_STATE.lives < 1) {
            console.log("GAME OVER");
            gameOver();
        }
    }
}

function checkGameWin() {
    if (GAME_STATE.pelletsEaten === 1060) {
        for (let i = 0; i < ghosts.length; i++) {
            ghosts[i].stop();
        }
        board.style.filter = "blur(8px)";
        gameWinDisplay.style.display = "block";
    }
}

function gameOver() {
    player.isDead = false;
    board.style.filter = "blur(8px)";
    gameOverDisplay.style.display = "block";
}

export { collision, unScareGhost, checkGameOver, checkGameWin, gameOver };

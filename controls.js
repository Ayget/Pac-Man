import { KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, KEY_CODE_DOWN, GAME_STATE } from './config.js';
import { resume, pause } from './game.js';

function onKeyDown(e) {
    if (e.keyCode === KEY_CODE_LEFT) {
        GAME_STATE.leftPressed = true;
    } else if (e.keyCode === KEY_CODE_RIGHT) {
        GAME_STATE.rightPressed = true;
    } else if (e.keyCode === KEY_CODE_UP) {
        GAME_STATE.upPressed = true;
    } else if (e.keyCode === KEY_CODE_DOWN) {
        GAME_STATE.downPressed = true;
    } else if (e.keyCode === 32) { // Space bar key code is 32
        if (GAME_STATE.paused) {
            resume(); // Resume the game if it's paused
        } else {
            pause(); // Pause the game if it's running
        }
    }
}

function onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT) {
        GAME_STATE.leftPressed = false;
    } else if (e.keyCode === KEY_CODE_RIGHT) {
        GAME_STATE.rightPressed = false;
    } else if (e.keyCode === KEY_CODE_UP) {
        GAME_STATE.upPressed = false;
    } else if (e.keyCode === KEY_CODE_DOWN) {
        GAME_STATE.downPressed = false;
    }
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

export { onKeyDown, onKeyUp };

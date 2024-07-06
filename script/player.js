import { canvas, ctx, GAME_STATE } from './config.js';

const player = {
    x: canvas.width / 2 + 16,
    y: canvas.height / 2 + 25,
    vx: 2.5,
    vy: 2.5,
    direction: "right",
    prevPos: {},
    isDead: false,
    updatePosition: function (layout) {
        this.prevPos = { x: this.x, y: this.y };
        if (GAME_STATE.leftPressed) {
            this.x -= this.vx;
            this.direction = "left";
        }
        if (GAME_STATE.rightPressed) {
            this.x += this.vx;
            this.direction = "right";
        }
        if (GAME_STATE.upPressed) {
            this.y -= this.vy;
            this.direction = "up";
        }
        if (GAME_STATE.downPressed) {
            this.y += this.vy;
            this.direction = "down";
        }
    },
    draw: function (ctx, tileSize) {
        let angle1 = { start: 0, end: 0, drawDir: false };
        let angle2 = { start: 0, end: 0, drawDir: false };

        if (this.direction === "right") {
            angle1 = { start: 0.25, end: 1.25, drawDir: false };
            angle2 = { start: 0.75, end: 1.75, drawDir: false };
        }
        if (this.direction === "left") {
            angle1 = { start: 0.25, end: 1.25, drawDir: true };
            angle2 = { start: 0.75, end: 1.75, drawDir: true };
        }
        if (this.direction === "up") {
            angle1 = { start: 1.25, end: 0.25, drawDir: true };
            angle2 = { start: 0.75, end: 1.75, drawDir: true };
        }
        if (this.direction === "down") {
            angle1 = { start: 0.75, end: 1.75, drawDir: false };
            angle2 = { start: 1.25, end: 0.25, drawDir: false };
        }
        ctx.beginPath();
        ctx.arc(player.x, player.y, GAME_STATE.playerRadius, angle1.start * Math.PI, angle1.end * Math.PI, angle1.drawDir);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(player.x, player.y, GAME_STATE.playerRadius, angle2.start * Math.PI, angle2.end * Math.PI, angle2.drawDir);
        ctx.fill();
    }
}

export { player };

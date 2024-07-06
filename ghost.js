import { ctx,canvas } from './config.js';

let randomDirection;
 

class Ghost {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = 4;
        this.vy = 4;
        this.radius = 8;
        this.prevPos = {};
        this.isScared = false;
        this.isEatable = false;
        this.direction = "right";
    }

    draw() {
        if (this.isScared === true) {
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.arc(this.x, this.y, this.radius, Math.PI, 2 * Math.PI);
            ctx.lineTo(this.x + this.radius, this.y + this.radius);
            ctx.arc(this.x + this.radius / 2, this.y + this.radius, this.radius * 0.5, 0, Math.PI);
            ctx.arc(this.x + this.radius / 2 - this.radius, this.y + this.radius, this.radius * 0.5, 0, Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "blue";
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, Math.PI, 2 * Math.PI);
            ctx.lineTo(this.x + this.radius, this.y + this.radius);
            ctx.arc(this.x + this.radius / 2, this.y + this.radius, this.radius * 0.5, 0, Math.PI);
            ctx.arc(this.x + this.radius / 2 - this.radius, this.y + this.radius, this.radius * 0.5, 0, Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }
    }

    move() {
        this.prevPos = { x: this.x, y: this.y };
        if (this.direction === "up") {
            this.y -= this.vy;
        } else if (this.direction === "down") {
            this.y += this.vy;
        } else if (this.direction === "left") {
            this.x -= this.vx;
        } else if (this.direction === "right") {
            this.x += this.vx;
        }
    }

    stop() {
        this.vx = 0;
        this.vy = 0;
    }

    changeDirection() {
        if (this.direction === getDirection()) {
            getDirection();
        } else {
            this.direction = randomDirection;
        }
    }
}

function getDirection() {
    const directions = {
        0: "up",
        1: "right",
        2: "down",
        3: "left"
    };
    const randomNumber = Math.floor(Math.random() * 4);
    randomDirection = directions[randomNumber];
    return randomDirection;
}

function drawGhosts() {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
}

function moveGhosts() {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].move();
    }
}
const inky = new Ghost(canvas.width / 2 + 140, canvas.height / 2 + 20, "lightBlue");
const blinky = new Ghost(canvas.width / 2 - 120, canvas.height / 2 - 200, "red");
const pinky = new Ghost(canvas.width / 2 - 40, canvas.height / 2 - 10, "pink");
const clyde = new Ghost(canvas.width / 2, canvas.height / 2 - 250, "yellow");
const blacky = new Ghost(canvas.width / 2 + 60, canvas.height / 2 - 10, "gray");

const ghosts = [inky, blinky, pinky, clyde, blacky];
export { Ghost, ghosts,drawGhosts, moveGhosts };

import { ctx, tileSize, layout, bricks } from './config.js';

function drawWall(ctx, layout, brickX, brickY) {
    const gradient = ctx.createLinearGradient(brickX, brickY, brickX + tileSize, brickY + tileSize);
    gradient.addColorStop(0, '#0000ff');
    gradient.addColorStop(1, '#1a1aff');
  
    ctx.fillStyle = gradient;
    ctx.fillRect(brickX, brickY, tileSize, tileSize);
  
    ctx.strokeStyle = "#00008B";
    ctx.lineWidth = 2;
    ctx.strokeRect(brickX, brickY, tileSize, tileSize);
}

const pellet = {
    draw:function(ctx, layout, pelletX,pelletY, tileSize){
        ctx.beginPath();
        ctx.arc(pelletX, pelletY, 2.5, 0,  2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill(); 
    },
    remove: function(ctx, layout, x, y, tileSize){
        ctx.fillStyle = "black";              
        ctx.fillRect(x*tileSize,y*tileSize,tileSize, tileSize);
    }
}

const powerPellet = {
    radius: 0,
    draw:function(ctx, layout, powerPelletX, powerPelletY, tileSize){
        ctx.beginPath();
        ctx.arc(powerPelletX, powerPelletY, this.radius, 0,  2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
    },
  
    remove: function(ctx, layout, x, y, tileSize){
        ctx.fillStyle = "black";              
        ctx.fillRect(x*tileSize,y*tileSize,tileSize, tileSize);
    }
}

//Power Pellet Movement
function dilate(){
    var fps = 7;
    setTimeout(function() {
        requestAnimationFrame(dilate);

        // ... Code for Drawing the Frame ...
      if (++powerPellet.radius > 5){
        while(powerPellet.radius > 0){
          powerPellet.radius--;
        }
        powerPellet.radius++;
    }
    }, 1000 / fps);
  }

function drawBoard() {
    for (let c = 0; c < layout.length; c++) {
        for (let r = 0; r < layout[c].length; r++) {
            if (layout[c][r] === 0) {
                let brickX = r * tileSize;
                let brickY = c * tileSize;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                bricks[c][r].type = "wall";
                drawWall(ctx, layout, brickX, brickY);
            } else if (layout[c][r] === 1) {
                let pelletX = r * tileSize + tileSize / 2;
                let pelletY = c * tileSize + tileSize / 2;
                bricks[c][r].x = pelletX;
                bricks[c][r].y = pelletY;
                bricks[c][r].type = "pellet";
                if (bricks[c][r].isEaten) {
                    pellet.remove(ctx, layout, pelletX, pelletY, tileSize);
                } else {
                    pellet.draw(ctx, layout, pelletX, pelletY, tileSize);
                }
            } else if (layout[c][r] === 4) {
                let powerPelletX = r * tileSize + tileSize / 2;
                let powerPelletY = c * tileSize + tileSize / 2;
                bricks[c][r].x = powerPelletX;
                bricks[c][r].y = powerPelletY;
                bricks[c][r].type = "powerPellet";
                if (bricks[c][r].isEaten) {
                    powerPellet.remove(ctx, layout, powerPelletX, powerPelletY, tileSize);
                } else {
                    powerPellet.draw(ctx, layout, powerPelletX, powerPelletY, tileSize);
                }
            }
        }
    }
}

export { drawBoard,dilate };

// canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.wdith = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = "50px Sawton_Circular_Regular.otf";

// mouse interactivity
let canvasPos = canvas.getBoundingClientRect();

const mouse = {
  x: canvas.wdith / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPos.left;
  mouse.y = event.y - canvasPos.top;
});

canvas.addEventListener("mouseup", function () {
  mouse.click = false;
});

// player
class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 25;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) {
      this.x -= dx / 30;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 30;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
    // ctx.fillRect(this.x, this.y, this.radius, 10);
  }
}

const player = new Player();

// bubbles

// animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();
  requestAnimationFrame(animate);
}
animate();

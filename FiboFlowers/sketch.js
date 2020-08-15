// paused 6:43
const canvas = document.getElementById("canvas1");
// returns a built-in object called CanvasRenderingContext2D
const ctx = canvas.getContext("2d");
// make sure the canvas cover the entire browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// set how individual shapes stack, interact and overlap ( similar to layers )
ctx.globalCompositeOperation = "destination-over";

// draw a petal at each increment
let number = 0;
// grow the flower from the center outward
let scale = 10;
// form variations
let shape = 3.09;
let size = 10;
// shape fill & stroke colors + background
// color set a
const color_a1 = "#475F94"; // whacking dusky blue
const color_a2 = "#FDDC5C"; // loverless light gold
const color_a3 = "#FA4224"; // unremarked orangey red
// stop drawing at that point
const limit = 225;
// control hsl rainbow effect
let hue = Math.random() * 360;

// draw shape
function drawFlower() {
  let angle = number * shape;
  let radius = scale * Math.sqrt(number);
  let positionX = radius * Math.sin(angle) + canvas.width / 2;
  let positionY = radius * Math.cos(angle) + canvas.height / 2;

  // ctx.fillStyle = color_a2;
  // rainbow colors
  ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
  ctx.lineWidth = 1;
  ctx.strokeStyle = color_a1;
  ctx.beginPath();
  ctx.arc(positionX, positionY, number, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // background
  canvas.style.background = color_a3;

  number++;
  hue += 0.5;
}

// create an animation loop :
// redraw canvas over and over creating an illusion of movement
function animate() {
  // draw each frame
  // clear the entire canvas
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFlower();
  // reset size past this limit
  if (number > limit) return;
  // our animate function is called over & over -> recursion
  requestAnimationFrame(animate);
}

animate();

/*
 * sketch_01
 * basic particle system
 */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// canvas.with = window.innerWidth;
// canvas.height = window.innerHeight;

// in cases where the size of the canvas is dynamic and not known at development time
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// hold our particles
const particlesArray = [];

// make sure we always resize and avoid stretching
window.addEventListener('resize', function() {
  canvas.with = window.offsetWidth;
  canvas.height = window.offsetHeight;
});

// store mouse coordinates globally
const mouse = {
  x: undefined,
  y: undefined
};

canvas.addEventListener('click', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
})

// Define properties & behaviour of our object
class Particle {
  // mandatory constructor method
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.floor(Math.random() * 5 + 1);
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = '#FFFD01';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// use our blueprint and create a bunch of particles
function init() {
  for (let i = 0; i < 100; i++) {
    // push to the end of our array
    particlesArray.push(new Particle());
  }
}
init();

function handleParticle() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

function animate() {
  // only draw the current frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
}
animate();

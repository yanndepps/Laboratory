/*
 * sketch_03
 * final effect
 */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// canvas.with = window.innerWidth;
// canvas.height = window.innerHeight;

// in cases where the size of the canvas is dynamic and not known at development time
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const particlesArray = [];
let hue = 0;

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
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
})

// Define properties & behaviour of our object
class Particle {
  // mandatory constructor method
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.floor(Math.random() * 14 + 1);
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ', 100%, 50% )';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ---
function handleParticle() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      // pythagorean theorem
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 50) {
        ctx.beginPath();
        // ctx.lineWidth = particlesArray[i].size / 10;
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = particlesArray[i].color;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      // console.log('num_part: ', particlesArray.length);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue += 0.5;
  requestAnimationFrame(animate);
}
animate();

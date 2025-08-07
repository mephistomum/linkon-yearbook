const canvas = document.getElementById("bfCanvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    const sidebar = document.querySelector("aside");
    const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;

    this.x = sidebarWidth + Math.random() * (canvas.width - sidebarWidth);
    this.y = Math.random() * canvas.height;
    this.size = 3 + Math.random() * 5; // Size of the stars
    this.speedY = 0.1 + Math.random() * 0.4; // Floating speed
    this.speedX = Math.random() * 0.5 - 0.25;
    this.opacity = 0.7 + Math.random() * 0.3; // Random opacity to make stars appear and disappear
    this.glow = Math.random() * 0.5 + 0.2; // Glowing effect
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    // Prevent stars from drifting into the sidebar
    const sidebar = document.querySelector("aside");
    const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
    if (this.x < sidebarWidth + this.size) {
      this.x = sidebarWidth + this.size;
      this.speedX = Math.abs(this.speedX);
    }

    if (this.x > canvas.width + this.size || this.y > canvas.height + this.size || this.y < -this.size) {
      this.reset(); // Reset star to random position if off-screen
    }
  }

  draw() {
    ctx.save();

    // Create glowing effect with radial gradient
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);  // White color with opacity
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);  // Transparent at the edge

    ctx.fillStyle = gradient;

    // Draw the "shiny star" as a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

createStars(50); // Number of stars
animate();

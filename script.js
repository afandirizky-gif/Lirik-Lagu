const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.7;

let balls = [];
let gravity = parseFloat(document.getElementById("gravity").value);
let friction = parseFloat(document.getElementById("friction").value);
let globalSpeed = parseFloat(document.getElementById("speed").value);
let ballSize = parseInt(document.getElementById("ballSize").value);

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function createBall(x, y, dx, dy, radius, color) {
  return { x, y, dx, dy, radius, color };
}

function addRandomBall() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const dx = (Math.random() - 0.5) * 4;
  const dy = (Math.random() - 0.5) * 4;
  const color = randomColor();
  balls.push(createBall(x, y, dx, dy, ballSize, color));
}

for (let i = 0; i < 5; i++) addRandomBall();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
    ctx.closePath();

    if (b.y + b.radius >= canvas.height) {
      b.dy = -b.dy * friction;
    } else {
      b.dy += gravity;
    }

    if (b.x + b.radius >= canvas.width || b.x - b.radius <= 0) {
      b.dx = -b.dx * friction;
    }

    b.x += b.dx * globalSpeed;
    b.y += b.dy * globalSpeed;
  });

  requestAnimationFrame(animate);
}

animate();

// Event kontrol
document.getElementById("addBall").addEventListener("click", addRandomBall);
document.getElementById("clearBall").addEventListener("click", () => balls = []);

document.getElementById("gravity").addEventListener("input", e => gravity = parseFloat(e.target.value));
document.getElementById("friction").addEventListener("input", e => friction = parseFloat(e.target.value));
document.getElementById("speed").addEventListener("input", e => globalSpeed = parseFloat(e.target.value));
document.getElementById("ballSize").addEventListener("input", e => ballSize = parseInt(e.target.value));

canvas.addEventListener("click", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const dx = (Math.random() - 0.5) * 6;
  const dy = (Math.random() - 0.5) * 6;
  balls.push(createBall(x, y, dx, dy, ballSize, randomColor()));
});

// Animasi lirik lagu
const teks = [
  "I'm wide awake...",
  "Yeah, I was in the dark...",
  "I was falling hard...",
  "With an open heart...",
  "I'm wide awake..."
];
let idx = 0;
setInterval(() => {
  idx = (idx + 1) % teks.length;
  document.getElementById("teksLirik").innerText = teks[idx];
}, 4000);

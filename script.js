const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let started = false;

document.addEventListener('keydown', e => {
  if (!started) {
    started = true;
  }
  switch (e.key) {
    case 'ArrowUp':    if (dy === 0) { dx = 0; dy = -1; } break;
    case 'ArrowDown':  if (dy === 0) { dx = 0; dy = 1; } break;
    case 'ArrowLeft':  if (dx === 0) { dx = -1; dy = 0; } break;
    case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0; } break;
  }
});

// 手机端触控控制
document.getElementById('up').addEventListener('click', () => {
  if (dy === 0) { dx = 0; dy = -1; started = true; }
});
document.getElementById('down').addEventListener('click', () => {
  if (dy === 0) { dx = 0; dy = 1; started = true; }
});
document.getElementById('left').addEventListener('click', () => {
  if (dx === 0) { dx = -1; dy = 0; started = true; }
});
document.getElementById('right').addEventListener('click', () => {
  if (dx === 0) { dx = 1; dy = 0; started = true; }
});

function gameLoop() {
  if (!started) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    alert('游戏结束！你的得分是：' + score);
    snake = [{ x: 10, y: 10 }];
    dx = dy = score = 0;
    apple = { x: 15, y: 15 };
    started = false;
    return;
  }

  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    apple = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);

  ctx.fillStyle = 'lime';
  for (let s of snake) {
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
  }

  ctx.fillStyle = '#fff';
  ctx.font = '14px Arial';
  ctx.fillText('得分：' + score, 10, canvas.height - 10);
}

setInterval(gameLoop, 150);

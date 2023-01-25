import Player from "./src/entities/Player.js";
import Control from "./src/entities/Control.js";

const defaultConsoleLog = console.log;

const createLogger = () => {
  const labelsMap = new Map();

  return (label, value) => {
    if (value === undefined) {
      defaultConsoleLog(label);
      return;
    }

    const prevValue = labelsMap.get(label);

    if (JSON.stringify(prevValue) !== JSON.stringify(value)) {
      labelsMap.set(label, value);
      defaultConsoleLog(label, value);
    }
  };
};

console.log = createLogger();

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const control = new Control();

const greenPlayer = new Player({
  color: "green",
  x: 100,
  y: 100,
  ctx,
  control,
});
const redPlayer = new Player({ color: "red", x: 300, y: 100, ctx });

function checkCollision(c1, c2) {
  const r1 = {
    left: c1.x,
    right: c1.x + c1.size,
    bottom: c1.y + c1.size,
    top: c1.y,
  };
  const r2 = {
    left: c2.x,
    right: c2.x + c2.size,
    bottom: c2.y + c2.size,
    top: c2.y,
  };

  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  greenPlayer.move();
  greenPlayer.draw();

  redPlayer.draw();

  const hasCollision = checkCollision(greenPlayer, redPlayer);
  if (hasCollision) {
    greenPlayer.hasCollision = true;
    redPlayer.hasCollision = true;
    redPlayer.x += 100;
  } else {
    greenPlayer.hasCollision = false;
    redPlayer.hasCollision = false;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

const app = new PIXI.Application({ width: 1000, height: 1000, background: 'white' });
document.body.appendChild(app.view);



class Player {
  constructor({ color, x, y }) {
    this.container = new PIXI.Container();
    this.color = color;
    this.container.x = x;
    this.container.y = y;

    this.size = 45;
    this.speedX = 0;
    this.hasCollision = false;

    this.shape = [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
    ];

    this.renderShape();
  }

  initialSprites() {
    for (let i = 0; i < 10; i++) {
      
    }
  }

  renderShape() {
    // console.log('RENDER')
    this.shape.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        if (!item) {
          const prevSprite = this.container.children.find((sprite) => sprite.id === `${rowIndex}${itemIndex}`);

          if (prevSprite) {
            prevSprite.destroy({ children: true });
          }

          return;
        };

        const sprite = PIXI.Sprite.from(`/images/${this.color}-block.png`);
        sprite.id = `${rowIndex}${itemIndex}`;
        sprite.x = this.size * itemIndex;
        sprite.y = this.size * rowIndex;
        this.container.addChild(sprite);
      });
    });

    app.stage.addChild(this.container);
  }

  changeShape(newShape) {
    if (this.shape.toString() === newShape.toString()) return;
    this.shape = newShape;
    this.renderShape();
  }

  move() {
    this.container.x += this.speedX;
  }
}

const control = new Control();
const greenPlayer = new Player({color: 'red', x: 100, y: 100});
app.ticker.add((delta) => {
  if (control.left) {
    greenPlayer.speedX = -1;
  }

  if (control.right) {
    greenPlayer.speedX = 1;
  }

  if (!control.right && !control.left) {
    greenPlayer.speedX = 0;
  }

  if (control.forward) {
    greenPlayer.changeShape([
      [1, 1, 1, 1],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0],
    ]);
  } else {
    greenPlayer.changeShape([
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
    ]);
  }


  greenPlayer.move();
});





// const defaultConsoleLog = console.log;

// const createLogger = () => {
//   const labelsMap = new Map();

//   return (label, value) => {
//     if (value === undefined) {
//       defaultConsoleLog(label);
//       return;
//     }

//     const prevValue = labelsMap.get(label);

//     if (JSON.stringify(prevValue) !== JSON.stringify(value)) {
//       labelsMap.set(label, value);
//       defaultConsoleLog(label, value);
//     }
//   };
// };

// console.log = createLogger();

// const canvas = document.getElementById("canvas");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const ctx = canvas.getContext("2d");

// const control = new Control();

// const greenPlayer = new Player({
//   color: "green",
//   x: 100,
//   y: 100,
//   ctx,
//   control,
// });
// const redPlayer = new Player({ color: "red", x: 300, y: 100, ctx });

// function checkCollision(c1, c2) {
//   const r1 = {
//     left: c1.x,
//     right: c1.x + c1.size,
//     bottom: c1.y + c1.size,
//     top: c1.y,
//   };
//   const r2 = {
//     left: c2.x,
//     right: c2.x + c2.size,
//     bottom: c2.y + c2.size,
//     top: c2.y,
//   };

//   return !(
//     r2.left > r1.right ||
//     r2.right < r1.left ||
//     r2.top > r1.bottom ||
//     r2.bottom < r1.top
//   );
// }

// function gameLoop() {
//   // ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // greenPlayer.move();
//   greenPlayer.draw();

//   // redPlayer.draw();

//   const hasCollision = checkCollision(greenPlayer, redPlayer);
//   if (hasCollision) {
//     greenPlayer.hasCollision = true;
//     redPlayer.hasCollision = true;
//     redPlayer.x += 100;
//   } else {
//     greenPlayer.hasCollision = false;
//     redPlayer.hasCollision = false;
//   }

//   requestAnimationFrame(gameLoop);
// }

// gameLoop();

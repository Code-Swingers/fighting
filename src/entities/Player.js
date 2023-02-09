export default class Player {
  constructor({ ctx, color, x, y, control }) {
    this.ctx = ctx;
    this.color = color;
    this.size = 50;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.control = control;
    this.hasCollision = false;

    // prettier-ignore
    this.form = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ];
  }

  draw() {
    this.form.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          this.ctx.fillStyle = "white";
          this.ctx.rect(
            this.x + cellIndex * this.size,
            this.y + rowIndex * this.size,
            this.size,
            this.size
          );
          this.ctx.fill();

          this.ctx.strokeStyle = this.color;
          this.ctx.stroke();
        }
      });
    });
  }

  move() {
    if (this.hasCollision) return;

    if (this.control.right) {
      this.speedX = 1;
      this.x += this.speedX;
    } else {
      this.speedX = 0;
    }

    if (this.control.left) {
      this.speedX = -1;
      this.x += this.speedX;
    } else {
      this.speedX = 0;
    }
  }
}

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
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
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

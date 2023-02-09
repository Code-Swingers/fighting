class Player {
  constructor({ color, x, y, control, speed = 3 }) {
    this.container = new PIXI.Container();
    this.control = control;
    this.color = color;
    this.container.x = x;
    this.container.y = y;
    this.speed = speed;

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

  renderShape() {
    this.container.removeChildren();
    this.shape.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        if (!item) return

        const sprite = PIXI.Sprite.from(`./images/${this.color}-block.png`);
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
    const { left, right, punch, kick } = this.control.keyMapping;
    if (this.control.state[left]) {
      this.speedX = -this.speed;
    }

    if (this.control.state[right]) {
      this.speedX = this.speed;
    }

    if (this.control.state[punch]) {
      this.speedX = 0;
      this.changeShape([
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
      ]);
    }

    if (!this.control.state[punch] && !this.control.isIdle()) {
      this.changeShape([
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
      ]);
    }

    if (this.control.isIdle()) {
      this.speedX = 0;

      this.changeShape([
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
      ]);
    }

    this.container.x += this.speedX;
  }
}

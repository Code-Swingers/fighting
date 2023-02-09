class Control {
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    this.addKeyboardListener();
  }

  onForward() {
    this.forward = true;
    this.reverse = false;
  }

  onReverse() {
    this.forward = false;
    this.reverse = true;
  }

  onLeft() {
    this.left = true;
    this.right = false;
  }

  onRight() {
    this.left = false;
    this.right = true;
  }

  onBreak() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
  }

  onControlKey(event, { onW, onD, onS, onA, onSpace }) {
    switch (event.code) {
      case "KeyW":
        return onW();
      case "KeyD":
        return onD();
      case "KeyS":
        return onS();
      case "KeyA":
        return onA();
      case "Space": {
        if (onSpace) onSpace();
        return;
      }
      default:
        return;
    }
  }

  addKeyboardListener() {
    const keyDownHandler = (event) => {
      this.onControlKey(event, {
        onW: this.onForward.bind(this),
        onD: this.onRight.bind(this),
        onS: this.onReverse.bind(this),
        onA: this.onLeft.bind(this),
        onSpace: this.onBreak.bind(this),
      });
    };
    const keyUpHandler = (event) => {
      this.onControlKey(event, {
        onW: () => {
          this.forward = false;
        },
        onD: () => {
          this.right = false;
        },
        onS: () => {
          this.reverse = false;
        },
        onA: () => {
          this.left = false;
        },
      });
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
  }
}

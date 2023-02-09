class Control {
  constructor(keyMapping) {
    this.state = {};
    this.keyMapping = keyMapping;
    this.keys = Object.values(this.keyMapping);

    this.resetState();

    this.addKeyboardListener();
  }

  isIdle() {
    let isIdle = true;

    this.keys.forEach((key) => {
      if (this.state[key]) {
        isIdle = false;
      }
    });

    return isIdle;
  }

  resetState() {
    this.keys.forEach((key) => {
      this.state[key] = false;
    });
  }

  addKeyboardListener() {
    const handleKeyDown = (event) => {
      this.state[event.key] = true;
    };

    const handleKeyUp = (event) => {
      this.state[event.key] = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }
}

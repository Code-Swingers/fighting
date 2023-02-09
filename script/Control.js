class Control {
  constructor(keyMapping) {
    this.state = {};
    this.keyMapping = keyMapping;
    this.keys = Object.values(this.keyMapping);

    this.resetState();

    this.addKeyboardListener();
  }

  resetState() {
    this.isIdle = true;

    this.keys.forEach((key) => {
      this.state[key] = false;
    });
  }

  addKeyboardListener() {
    const handleKeyDown = (event) => {
      this.isIdle = false;

      this.state[event.key] = true;
    };

    const handleKeyUp = () => {
      this.resetState();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }
}

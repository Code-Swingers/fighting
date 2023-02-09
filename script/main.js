const app = new PIXI.Application({ width: 1000, height: 500, background: 'white' });
document.body.appendChild(app.view);

const greenControl = new Control({
  left: 'a',
  right: 'd',
  punch: 'o',
  kick: 'p',
});
const redControl = new Control({
  left: 'ArrowLeft',
  right: 'ArrowRight',
  punch: '1',
  kick: '2',
});
const greenPlayer = new Player({color: 'green', x: 100, y: 100, control: greenControl});
const redPlayer = new Player({color: 'red', x: 300, y: 100, control: redControl});

app.ticker.add((delta) => {
  greenPlayer.move();
  redPlayer.move();
});

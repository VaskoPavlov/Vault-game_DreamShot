import { Application } from '@pixi/app';
import { Rectangle } from '@pixi/math';
import '@pixi/events';
import { setupGame } from '../src/setupGame';

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
});

const canvas = app.view as HTMLCanvasElement;
document.body.appendChild(canvas);

canvas.setAttribute('tabindex', '0');
canvas.style.outline = 'none';
canvas.style.touchAction = 'none';
canvas.focus();

Object.assign(canvas.style, {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'block',
});

app.stage.eventMode = 'static';
app.stage.hitArea = new Rectangle(0, 0, app.screen.width, app.screen.height);

// 🚀 Kick off the game
setupGame(app);

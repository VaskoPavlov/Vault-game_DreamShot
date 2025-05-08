// main.ts
import { Application } from '@pixi/app';
import { Rectangle } from '@pixi/math';
import '@pixi/events';
import { setupGame } from './setupGame';

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
});
document.body.appendChild(app.view as HTMLCanvasElement);

app.stage.eventMode = 'static';
app.stage.hitArea = new Rectangle(0, 0, app.screen.width, app.screen.height);

setupGame(app);

import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import {
  DESIGN_WIDTH,
  DESIGN_HEIGHT,
  DOOR_X,
  DOOR_Y,
  DOOROPEN_X,
  DOOROPEN_Y,
  DOOROPENSHADOW_X,
  DOOROPENSHADOW_Y,
} from '../utils/consts/constants';

export class Scene extends Container {
  public bg: Sprite;
  public door: Sprite;
  public handle: Sprite;
  public handleShadow: Sprite;
  public doorOpen: Sprite;
  public doorOpenShadow: Sprite;

  constructor() {
    super();

    this.bg = Sprite.from('assets/bg.png');
    this.bg.anchor.set(0);
    this.bg.width = DESIGN_WIDTH;
    this.bg.height = DESIGN_HEIGHT;
    this.addChild(this.bg);

    this.door = Sprite.from('assets/door.png');
    this.door.anchor.set(0.5);
    this.door.x = DOOR_X;
    this.door.y = DOOR_Y;
    this.addChild(this.door);

    this.handleShadow = Sprite.from('assets/handleShadow.png');
    this.handle = Sprite.from('assets/handle.png');
    this.handleShadow.anchor.set(0.47);
    this.handle.anchor.set(0.49);
    this.handleShadow.x = this.handle.x = 635;
    this.handleShadow.y = this.handle.y = DOOR_Y;
    this.addChild(this.handleShadow);
    this.addChild(this.handle);

    this.doorOpen = Sprite.from('assets/doorOpen.png');
    this.doorOpen.anchor.set(0.5);
    this.doorOpen.x = DOOROPEN_X;
    this.doorOpen.y = DOOROPEN_Y;
    this.addChild(this.doorOpen);

    this.doorOpenShadow = Sprite.from('assets/doorOpenShadow.png');
    this.doorOpenShadow.anchor.set(0.5);
    this.doorOpenShadow.x = DOOROPENSHADOW_X;
    this.doorOpenShadow.y = DOOROPENSHADOW_Y;
    this.addChild(this.doorOpenShadow);
  }
}

import { Graphics } from '@pixi/graphics';
import { Rectangle } from '@pixi/math';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from '../utils/consts/constants';
import type { Direction } from '../game/combo';

export type ZoneSide = 'left' | 'right';

export interface ZoneOptions {
  side: ZoneSide;
  onTurn: (direction: Direction) => void;
}


export class Zone extends Graphics {
  private side: ZoneSide;
  private hitAreaRect: Rectangle;
  private callback: (direction: Direction) => void;

  constructor(options: ZoneOptions) {
    super();
    this.side = options.side;
    this.callback = options.onTurn;

    this.hitAreaRect = this.createHitArea(this.side);
    this.hitArea = this.hitAreaRect;

    this.beginFill(0x0000ff, 0)
      .drawRect(
        this.hitAreaRect.x,
        this.hitAreaRect.y,
        this.hitAreaRect.width,
        this.hitAreaRect.height
      )
      .endFill();

    this.eventMode = 'static';
    this.cursor = 'pointer';
    this.on('pointerdown', this.handleClick.bind(this));
  }

  private createHitArea(side: ZoneSide): Rectangle {
    if (side === 'left') {
      return new Rectangle(0, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT);
    }
    return new Rectangle(DESIGN_WIDTH / 2, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT);
  }

  private handleClick(): void {
    const direction: Direction =
      this.side === 'left' ? 'COUNTERCLOCKWISE' : 'CLOCKWISE';
    this.callback(direction);
  }
}

import { Graphics } from '@pixi/graphics';
import { Rectangle } from '@pixi/math';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from '../utils/consts/constants';
import type { Direction } from '../game/combo';

type InteractiveGraphics = Graphics & {
  eventMode: string;
  cursor: string;
  hitArea: Rectangle;
  on: (event: string, fn: (...args: any[]) => void) => void;
};

export function createClickZones(
  onTurn: (direction: Direction) => void
): [InteractiveGraphics, InteractiveGraphics] {
  const leftZone = new Graphics() as InteractiveGraphics;
  leftZone.beginFill(0x0000ff, 0)
    .drawRect(0, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT)
    .endFill();
  leftZone.eventMode = 'static';
  leftZone.cursor = 'pointer';
  leftZone.hitArea = new Rectangle(0, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT);
  leftZone.on('pointertap', () => onTurn('COUNTERCLOCKWISE'));

  const rightZone = new Graphics() as InteractiveGraphics;
  rightZone.beginFill(0xff0000, 0)
    .drawRect(DESIGN_WIDTH / 2, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT)
    .endFill();
  rightZone.eventMode = 'static';
  rightZone.cursor = 'pointer';
  rightZone.hitArea = new Rectangle(DESIGN_WIDTH / 2, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT);
  rightZone.on('pointertap', () => onTurn('CLOCKWISE'));

  return [leftZone, rightZone];
}

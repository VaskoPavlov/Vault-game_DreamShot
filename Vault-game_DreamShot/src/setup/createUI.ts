import { Text, TextStyle } from '@pixi/text';

export function createUI(): { statusText: Text; timerText: Text } {
  const statusText = new Text('', new TextStyle({
    fontSize: 32,
    fill: 0x000000,
  }));
  statusText.position.set(50, 50);

  const timerText = new Text('00:00', new TextStyle({
    fontFamily: 'Courier',
    fontSize: 14,
    fill: 0xffffff,
  }));
  timerText.anchor.set(0.5);
  timerText.x = 390;
  timerText.y = 290;

  return { statusText, timerText };
}

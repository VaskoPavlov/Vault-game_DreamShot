import { Container } from '@pixi/display';
import { Text, TextStyle } from '@pixi/text';

export class UI extends Container {
  public statusText: Text;
  public timerText: Text;

  constructor() {
    super();
    this.statusText = new Text('', new TextStyle({
      fontSize: 32,
      fill: 0x000000,
    }));
    this.statusText.position.set(50, 50);
    this.addChild(this.statusText);

    this.timerText = new Text('00:00', new TextStyle({
      fontFamily: 'Courier',
      fontSize: 14,
      fill: 0xffffff,
    }));
    this.timerText.anchor.set(0.5);
    this.timerText.position.set(390, 290);
    this.addChild(this.timerText);
  }

  public setStatus(text: string): void {
    this.statusText.text = text;
  }

  public setTimer(minutes: number, seconds: number): void {
    const mm = String(Math.floor(minutes)).padStart(2, '0');
    const ss = String(Math.floor(seconds)).padStart(2, '0');
    this.timerText.text = `${mm}:${ss}`;
  }
}




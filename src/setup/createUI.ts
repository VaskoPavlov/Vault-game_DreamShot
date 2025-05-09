import { Container } from '@pixi/display';
import { Text, TextStyle } from '@pixi/text';

export class UI extends Container {
  public statusText: Text;

  constructor() {
    super();
    this.statusText = new Text('', new TextStyle({
      fontSize: 32,
      fill: 0x000000,
    }));
    this.statusText.position.set(50, 50);
    this.addChild(this.statusText);
  }

  public setStatus(text: string): void {
    this.statusText.text = text;
  }
}




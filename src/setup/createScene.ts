import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { DESIGN_WIDTH, DESIGN_HEIGHT, DOOR_X, DOOR_Y, DOOROPEN_X, DOOROPEN_Y, DOOROPENSHADOW_X, DOOROPENSHADOW_Y } from '../utils/consts/constants';

export function createScene(): { scene: Container; bg: Sprite; door:Sprite; handle:Sprite; handleShadow:Sprite; doorOpen: Sprite; doorOpenShadow: Sprite } {
      const scene = new Container();
    
      const bg = Sprite.from('assets/bg.png');
      bg.anchor.set(0);
      bg.width = DESIGN_WIDTH;
      bg.height = DESIGN_HEIGHT;
      scene.addChild(bg);
    
      const door = Sprite.from('assets/door.png');
      door.anchor.set(0.5);
      door.x = DOOR_X;
      door.y = DOOR_Y;
      scene.addChild(door);
    
      const handleShadow = Sprite.from('assets/handleShadow.png');
      const handle = Sprite.from('assets/handle.png');
      handleShadow.anchor.set(0.47);
      handle.anchor.set(0.49);
      handleShadow.x = handle.x = 635;
      handleShadow.y = handle.y = door.y;
      scene.addChild(handleShadow);
      scene.addChild(handle);

      const doorOpen = Sprite.from('assets/doorOpen.png');
      doorOpen.x = DOOROPEN_X;
      doorOpen.y = DOOROPEN_Y;
      doorOpen.anchor.set(0.5);

      const doorOpenShadow = Sprite.from('assets/doorOpenShadow.png');
      doorOpenShadow.x = DOOROPENSHADOW_X;
      doorOpenShadow.y = DOOROPENSHADOW_Y;
      doorOpenShadow.anchor.set(0.5);
    
      return {
        scene,
        bg,
        door,
        handle,
        handleShadow,
        doorOpenShadow,
        doorOpen
      };
    }
    

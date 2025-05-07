import { Sprite } from '@pixi/sprite';
import { Vault } from '../game/vault';
import { Text } from '@pixi/text';
import { wait } from '../utils/utils';
import { CombinationStep } from '../game/combo';


export function createVault(
  combo: CombinationStep[],
  door: Sprite,
  handle: Sprite,
  handleShadow: Sprite,
  statusText: Text,
  doorOpenShadow: Sprite,
  doorOpen:Sprite,
  reset: () => void
) {
  return new Vault(
    combo, 
    async () => {
      statusText.text = '✔ Vault Unlocked!';
      statusText.style.fill = 0x00ff00;

      const parent = door.parent!;
      handle.destroy();
      handleShadow.destroy();
      door.destroy();

      parent.addChild(doorOpenShadow);
      parent.addChild(doorOpen);

      await wait(5000);
      reset();
    },
    () => {
      statusText.text = '✘ Wrong Combo! Resetting...';
      statusText.style.fill = 0xff3333;
      reset();
    }
  );
}

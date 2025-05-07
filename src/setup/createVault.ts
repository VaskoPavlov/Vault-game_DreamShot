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
  reset: () => void
) {
  return new Vault(
    combo, // You can inject the generated combo here
    async () => {
      statusText.text = '✔ Vault Unlocked!';
      statusText.style.fill = 0x00ff00;
      handle.destroy();
      handleShadow.destroy();
      door.destroy();
      // You can add doorOpen + shadow logic here too
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

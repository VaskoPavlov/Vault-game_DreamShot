import { Sprite } from '@pixi/sprite';
import { Text } from '@pixi/text';
import { wait } from '../utils/utils';
import { CombinationStep, Direction } from '../game/combo';
import { Vault } from '../game/vault';
import { Scene } from './createScene';

export interface VaultControllerOptions {
  scene: Scene;
  combo: CombinationStep[];
  door: Sprite;
  handle: Sprite;
  handleShadow: Sprite;
  doorOpen: Sprite;
  doorOpenShadow: Sprite;
  statusText: Text;
  reset: () => void;
}

export class VaultController {
  private vault: Vault;
  private options: VaultControllerOptions;
  private currentStep = 0;

  constructor(options: VaultControllerOptions) {
    this.options = options;

    this.vault = new Vault(
      options.combo,
      this.handleSuccess.bind(this),
      this.handleFailure.bind(this)
    );
  }

  public inputTurn(stepIndex: number, direction: Direction): void {
    this.vault.inputTurn(stepIndex, direction);
    this.currentStep = (this.currentStep + 1) % this.options.combo.length
  }

  private async handleSuccess(): Promise<void> {
    const {
      scene,
      statusText,
      door,
      handle,
      handleShadow,
      doorOpen,
      doorOpenShadow,
      reset,
    } = this.options;

    scene.openDoor();

    statusText.text = '✔ Vault Unlocked!';
    statusText.style.fill = 0x00ff00;

    door.visible = false;
    handle.visible = false;
    handleShadow.visible = false;

    doorOpen.visible = true;
    doorOpenShadow.visible = true;

    await wait(5000);
    reset();
  }

  private handleFailure(): void {
    const { statusText, reset } = this.options;

    statusText.text = '✘ Wrong Combo! Resetting...';
    statusText.style.fill = 0xff3333;

    reset();
  }
}
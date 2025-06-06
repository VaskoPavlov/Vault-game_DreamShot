import { Direction } from './combo';

interface Turn {
  value: number;
  direction: Direction;
}

type OnSuccess = () => void;
type OnFail = () => void;

export class Vault {
  private combo: Turn[];
  private currentIndex: number = 0;
  private remaining: number = 0;
  private onSuccess: OnSuccess;
  private onFail: OnFail;

  constructor(combo: Turn[], onSuccess: OnSuccess, onFail: OnFail) {
    this.combo = combo;
    this.onSuccess = onSuccess;
    this.onFail = onFail;
    this.remaining = combo[0]?.value || 0;
  }

  inputTurn(_value: number, direction: Direction) {
    const expected = this.combo[this.currentIndex];

    if (direction !== expected.direction) {
      this.reset(this.combo);
      this.onFail();
      return;
    }

    this.remaining--;

    if (this.remaining === 0) {
      this.currentIndex++;

      if (this.currentIndex >= this.combo.length) {
        this.onSuccess();
      } else {
        this.remaining = this.combo[this.currentIndex].value;
      }
    } else if (this.remaining < 0) {
      this.reset(this.combo);
      this.onFail();
    }
  }

  reset(combo: Turn[]) {
    this.combo = combo;
    this.currentIndex = 0;
    this.remaining = combo[0]?.value || 0;
  }
}
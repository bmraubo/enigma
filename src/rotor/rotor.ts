import { CurrentDirection } from "./current-direction.enum";
import { Wiring } from "./wiring";

export interface RotorConfig {
  wiring: Wiring;
  notchOffset: number[];
}

export class Rotor {
  wiring: Wiring;
  notchOffset: number[];

  ringSetting = 1;
  step = 1;

  constructor({ wiring, notchOffset }: RotorConfig) {
    this.wiring = wiring;
    this.notchOffset = notchOffset;
  }

  possibleRotorSetting(setting: number) {
    const minRotation = 1;
    const maxRotation = 26;
    return setting <= maxRotation && setting >= minRotation;
  }

  setRingSetting(setting: number) {
    if (this.possibleRotorSetting(setting)) {
      this.ringSetting = setting;
      this.wiring.applyRingSetting(this.ringSetting)
    } else {
      throw TypeError("INVALID ROTATION SETTING ERROR");
    }
  }

  getRingSetting() {
    return this.ringSetting;
  }

  setStep(step: number) {
    if (this.possibleRotorSetting(step)) {
      this.step = step;
    } else {
      throw TypeError("INVALID ROTATION SETTING ERROR");
    }
  }

  getStep() {
    return this.step;
  }

  hasHitNotch() {
    return this.notchOffset.includes(this.step + this.ringSetting - 1);
  }

  rotate() {
    this.possibleRotorSetting(this.step + 1) ? this.step++ : (this.step = 1);
  }

  input(letter: string, direction: CurrentDirection) {
    const unadjustedOutput = this.wiring.getOutputFrom(
      this.adjustInputForStep(letter)!,
      direction
    );
    console.log(`Input ${letter}, output: ${this.adjustOutputForStep(unadjustedOutput)}`)

    return this.adjustOutputForStep(unadjustedOutput);
  }

  private adjustInputForStep(input: string) {
    return this.wiring.getInputLetterByIndex(
      this.wiring.getInputLetterIndex(input) + this.stepToIndex()
    );
  }

  private adjustOutputForStep(output: string) {
    return this.wiring.getInputLetterByIndex(
      this.wiring.getInputLetterIndex(output) - this.stepToIndex()
    );
  }

  private stepToIndex() {
    return this.step - 1;
  }
}

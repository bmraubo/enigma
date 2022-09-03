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
      this.adjustInputForStep(letter, direction)!,
      direction
    );
    return this.adjustOutputForStep(unadjustedOutput, direction);
  }

  private adjustInputForStep(input: string, direction: CurrentDirection) {
    return this.wiring.getInputLetterByIndex(
      this.wiring.getInputLetterIndex(input) + this.stepToIndex()
    );
  }

  private adjustOutputForStep(output: string, direction: CurrentDirection) {
    return this.wiring.getInputLetterByIndex(
      this.wiring.getInputLetterIndex(output) - this.stepToIndex()
    );
  }

  private stepToIndex() {
    return this.step - 1;
  }
}

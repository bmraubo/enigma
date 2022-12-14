import { CurrentDirection } from "./current-direction.enum";
import { Reflector } from "./reflector";
import { Rotor } from "./rotor";

export interface RotorMachineConfig {
  positions: Map<number, Rotor>;
  reflector: Reflector;
}

export class RotorMachine {
  positions: Map<number, Rotor>;
  reflector: Reflector;

  constructor(rotorMachineConfig: RotorMachineConfig) {
    this.positions = rotorMachineConfig.positions;
    this.reflector = rotorMachineConfig.reflector;
  }

  getRotorByPosition(position: number) {
    return this.positions.get(position);
  }

  getRingSettings() {
    return {
      1: this.getRotorByPosition(1)?.getRingSetting(),
      2: this.getRotorByPosition(2)?.getRingSetting(),
      3: this.getRotorByPosition(3)?.getRingSetting(),
    };
  }

  setRingSettings(rotationValues: number[]) {
    let positionsList = [1, 2, 3];
    for (let position of positionsList) {
      this.getRotorByPosition(position)?.setRingSetting(
        rotationValues[position - 1]
      );
    }
  }

  setStartingPositions(rotationValues: number[]) {
    let positionsList = [1, 2, 3];
    for (let position of positionsList) {
      this.getRotorByPosition(position)?.setStep(rotationValues[position - 1]);
    }
  }

  input(letter: string) {
    let outcome: string;
    let forRotation = this.checkRotorNotches();
    this.rotate(forRotation); // will need to account for double stepping anomaly
    outcome = this.passLetterThroughRotors(letter, CurrentDirection.FORWARD);
    outcome = this.reflector.input(outcome);
    outcome = this.passLetterThroughRotors(outcome, CurrentDirection.REVERSE);
    return outcome;
  }

  private passLetterThroughRotors(letter: string, direction: CurrentDirection) {
    const rotorOrder = direction == "forward" ? [3, 2, 1] : [1, 2, 3];
    let outcome = letter;
    for (let rotor of rotorOrder) {
      outcome = this.getRotorByPosition(rotor)?.input(outcome, direction)!;
    }
    return outcome;
  }

  private rotate(forRotation: number[]) {
    for (let rotorPosition of forRotation) {
      this.getRotorByPosition(rotorPosition)?.rotate();
    }
  }

  private checkRotorNotches() {
    let forRotation = [3];
    for (let position of [3, 2, 1]) {
      if (this.getRotorByPosition(position)?.hasHitNotch()) {
        forRotation.push(position + 1);
      }
    }
    return forRotation;
  }
}

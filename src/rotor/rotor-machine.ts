import { Rotor, Wiring } from "./rotor"

export class Reflector {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: Map<string, string>;

    constructor(wiringString: string) {
        this.wiring = this.getWiringFromString(wiringString)
    }

    input(inputLetter: string): string {
        return String(this.wiring.get(inputLetter)) as string
    }

    private getWiringFromString(wiringString: string) {
        const wiring = new Map()
        let inputLetterIndex = 0
        wiringString.toUpperCase().split("").map((outcomeLetter: string) => {
            wiring.set(this.inputLetters[inputLetterIndex], outcomeLetter)
            inputLetterIndex++
        })
        return wiring
    }
}

export interface RotorMachineConfig {
    positions: Map<number, Rotor>
    reflector: Reflector
}

export class RotorMachine {
    positions: Map<number, Rotor>
    reflector: Reflector

    constructor(rotorMachineConfig: RotorMachineConfig) {
        this.positions = rotorMachineConfig.positions
        this.reflector = rotorMachineConfig.reflector
    }

    getRotorByPosition(position: number) {
        return this.positions.get(position)
    }

    getRotationValues() {
        return {
            1: this.getRotorByPosition(1)?.getRotationNumber(),
            2: this.getRotorByPosition(2)?.getRotationNumber(),
            3: this.getRotorByPosition(3)?.getRotationNumber(),
        }
    }

    setRotationValues(rotationValues: number[]) {
        let positionsList = [1, 2, 3]
        for (let position of positionsList) {
            this.getRotorByPosition(position)?.setRotation(rotationValues[position-1])
        }
    }

    input(letter: string) {
        let outcome: string;
        outcome = this.getRotorByPosition(1)?.input(letter);
        outcome = this.getRotorByPosition(2)?.input(outcome);
        outcome = this.getRotorByPosition(3)?.input(outcome);
        outcome = this.reflector.input(outcome);
        outcome = this.getRotorByPosition(3)?.input(outcome);
        outcome = this.getRotorByPosition(2)?.input(outcome);
        outcome = this.getRotorByPosition(1)?.input(outcome);
        return outcome
    }
}
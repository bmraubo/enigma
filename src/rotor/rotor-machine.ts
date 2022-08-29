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

    getRingSettings() {
        return {
            1: this.getRotorByPosition(1)?.getRotorSetting(),
            2: this.getRotorByPosition(2)?.getRotorSetting(),
            3: this.getRotorByPosition(3)?.getRotorSetting(),
        }
    }

    setRingSettings(rotationValues: number[]) {
        let positionsList = [1, 2, 3]
        for (let position of positionsList) {
            this.getRotorByPosition(position)?.setRotorSetting(rotationValues[position-1])
        }
    }

    checkRotorNotches() {
        let forRotation = [1]
        for (let rotor of this.positions.values()) {
            if (rotor.hasHitNotch()) {
                rotor.rotate()
            }
        }
        return forRotation
    }

    rotate(forRotation: number[]) {
        for (let rotorPosition of forRotation) {
            this.getRotorByPosition(rotorPosition)?.rotate()
        }
    }

    input(letter: string) {
        let outcome: string;
        let forRotation = this.checkRotorNotches()
        this.rotate(forRotation)
        // check if notch is hit, if yes, rotate 2/3
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
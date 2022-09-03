import { CurrentDirection, Rotor } from "./rotor"

export class Reflector {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: Map<string, string>;

    constructor(wiringString: string) {
        this.wiring = this.getWiringFromString(wiringString)
    }

    input(inputLetter: string): string {
        const output = this.wiring.get(inputLetter) as string
        console.log("Reflector: " + inputLetter + "=>" + output)
        return output
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
            1: this.getRotorByPosition(1)?.getRingSetting(),
            2: this.getRotorByPosition(2)?.getRingSetting(),
            3: this.getRotorByPosition(3)?.getRingSetting(),
        }
    }

    setRingSettings(rotationValues: number[]) {
        let positionsList = [1, 2, 3]
        for (let position of positionsList) {
            this.getRotorByPosition(position)?.setRingSetting(rotationValues[position-1])
        }
    }

    setStartingPositions(rotationValues: number[]) {
        let positionsList = [1, 2, 3]
        for (let position of positionsList) {
            this.getRotorByPosition(position)?.setStep(rotationValues[position-1])
        }
    }

    checkRotorNotches() {
        let forRotation = [3]
        for (let position of [2, 1]) {
            if (this.getRotorByPosition(position)?.hasHitNotch()) {
                forRotation.push(position + 1)
            }
        }
        return forRotation
    }

    rotate(forRotation: number[]) {
        for (let rotorPosition of forRotation) {
            console.log("rotating " + rotorPosition)
            this.getRotorByPosition(rotorPosition)?.rotate()
        }
    }

    adjustInputForRotationOfPreviousRotor(input: string, previousRotor: Rotor) {
        const inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const adjustedInput = inputLetters[inputLetters.indexOf(input) - previousRotor.step + 1]
        console.log("AdjustedInput: " + adjustedInput)
        return adjustedInput
    }

    input(letter: string) {
        let outcome: string;
        // when a key is pressed, the rotors are rotated before the circuit is made
        let forRotation = this.checkRotorNotches()
        console.log(forRotation)
        this.rotate(forRotation) // will need to account for double stepping anomaly
        // check if notch is hit, if yes, rotate 2/3
        console.log("1 - unadjusted input: " + letter)
        outcome = this.getRotorByPosition(3)?.input(letter, CurrentDirection.FORWARD)!;
        console.log("2 - unadjusted input: " + outcome)
        outcome = this.getRotorByPosition(2)?.input(outcome, CurrentDirection.FORWARD)!;
        console.log("3 - unadjusted input: " + outcome)
        outcome = this.getRotorByPosition(1)?.input(outcome, CurrentDirection.FORWARD)!;
        outcome = this.reflector.input(outcome);
        console.log("3 - unadjusted input: " + outcome)
        outcome = this.getRotorByPosition(1)?.input(outcome, CurrentDirection.REVERSE)!;
        console.log("2 - unadjusted input: " + outcome)
        outcome = this.getRotorByPosition(2)?.input(outcome, CurrentDirection.REVERSE)!;
        console.log("1 - unadjusted input: " + outcome)
        outcome = this.getRotorByPosition(3)?.input(outcome, CurrentDirection.REVERSE)!;
        return outcome
    }
}
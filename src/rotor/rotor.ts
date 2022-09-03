export enum CurrentDirection {
    FORWARD = "forward",
    REVERSE = "reverse"
}

export class Wiring {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: {
        forward: Map<string, string>
        reverse: Map<string, string>
    }

    constructor(wiringString: string) {
        this.wiring = this.connectWiring(wiringString)
    }

    getInputLetterIndex(letter: string) {
        return this.inputLetters.indexOf(letter)
    }

    getInputLetterByIndex(index: number) {
        if (index >= 0 && index <= 25) {
            return this.inputLetters[index]
        }
        if (index < 0) {
            return this.inputLetters[index + 26]
        } 
        if (index > 25) {
            return this.inputLetters[index - 26]
        }

    }

    getOutputFrom(letter: string, direction: CurrentDirection) {
        return this.wiring[direction].get(letter.toUpperCase()) as string
    }

    private generateWiringMap(inputString: string, outputString: string) {
        const wiringMap = new Map()
        let inputLetterIndex = 0
        outputString.toUpperCase().split("").map((outcomeLetter: string) => {
            wiringMap.set(inputString[inputLetterIndex], outcomeLetter)
            inputLetterIndex++
        })
        return wiringMap
    }

    private connectWiring(wiringString: string) {
        return {
            forward: this.generateWiringMap(this.inputLetters, wiringString),
            reverse: this.generateWiringMap(wiringString, this.inputLetters)
        }
    }
}

export interface RotorConfig {
    wiring: Wiring,
    notchOffset: number[]
}

export class Rotor {
    wiring: Wiring
    notchOffset: number[]

    ringSetting = 1
    step = 1
    testOffset = 1

    constructor({ wiring, notchOffset }: RotorConfig) {
        this.wiring = wiring
        this.notchOffset = notchOffset
    }

    possibleRotorSetting(setting: number) {
        const minRotation = 1
        const maxRotation = 26
        return setting <= maxRotation && setting >= minRotation
    }

    setRingSetting(setting: number) {
        if (this.possibleRotorSetting(setting)) {
            this.ringSetting = setting
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        }    
    }

    getRingSetting() {
        return this.ringSetting
    }

    setStep(step: number) {
        if (this.possibleRotorSetting(step)) {
            this.step = step
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        } 
    }

    getStep() {
        return this.step
    }

    hasHitNotch() {
        return this.notchOffset.includes(this.step + this.ringSetting - 1)
    }

    rotate() {
        this.possibleRotorSetting(this.step + 1) ? this.step++ : this.step = 1
    }

    input(letter: string, direction: CurrentDirection) {
        return this.adjustOutputForStep(this.wiring.getOutputFrom(this.adjustInputForStep(letter, direction)!, direction), direction)
    }

    private adjustInputForStep(input: string, direction: CurrentDirection) {
        return this.wiring.getInputLetterByIndex(this.wiring.getInputLetterIndex(input) + this.stepToIndex())
    }

    private adjustOutputForStep(output: string, direction: CurrentDirection) {
        return this.wiring.getInputLetterByIndex(this.wiring.getInputLetterIndex(output) - this.stepToIndex())
    }

    private stepToIndex() {
        return this.step - 1
    }
}
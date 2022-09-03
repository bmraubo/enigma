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
        return this.inputLetters[index]
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

    private connectWiring(outputString: string) {
        return {
            forward: this.generateWiringMap(this.inputLetters, outputString),
            reverse: this.generateWiringMap(outputString, this.inputLetters)
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

    rotate() {
        if (this.possibleRotorSetting(this.step + 1)) {
            this.step++
        } else {
            this.step = 1
        }
        
    }

    hasHitNotch() {
        return this.notchOffset.includes(this.step + this.ringSetting - 1)
    }

    adjustInputForStep(input: string) {
        return this.wiring.getInputLetterByIndex(this.step - 1)
    }

    input(letter: string, direction: CurrentDirection) {
        console.log("input: " + letter)
        let output = this.wiring.getOutputFrom(this.adjustInputForStep(letter), direction)
        console.log("output: " + output)
        return output
    }
}
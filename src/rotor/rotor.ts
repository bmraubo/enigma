export class Wiring {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: Map<string, string>

    constructor(wiringString: string) {
        this.wiring = this.getWiringFromString(wiringString)
    }

    getInputLetterIndex(letter: string) {
        return this.inputLetters.indexOf(letter)
    }

    getInputLetterByIndex(index: number) {
        return this.inputLetters[index]
    }

    getOutputFrom(letter: string) {
        return this.wiring.get(letter.toUpperCase()) as string
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

export interface RotorConfig {
    wiring: Wiring,
    notch: string[],
}

export class Rotor {
    minRotation = 1
    maxRotation = 26
    wiring: Wiring
    notch: string[]
    
    rotorSetting = 1

    constructor({ wiring, notch }: RotorConfig) {
        this.wiring = wiring
        this.notch = this.prepareNotchFromInput(notch)
    }

    getRotorSetting() {
        return this.rotorSetting
    }

    getRotorSettingLetterValue() {
        return this.wiring.inputLetters[this.rotorSetting - 1]
    }

    hasHitNotch() {
        for (let notchLetter of this.notch) {
            if (this.wiring.inputLetters.indexOf(notchLetter) == this.rotorSetting - 1) {
                return true
            }
        }
        return false
    }

    setRotorSetting(newRotation: number) {
        if (newRotation <= this.maxRotation && newRotation >= this.minRotation) {
            this.rotorSetting = newRotation
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        }
    }

    rotate() {
        if (this.rotorSetting < this.maxRotation) {
            this.rotorSetting++
        } else if (this.rotorSetting == this.maxRotation ) {
            this.rotorSetting = this.minRotation
        }
    }

    input(letter: string): string {
        return this.wiring.getOutputFrom(this.adjustForRotorSetting(letter)) as string
    }

    adjustForRotorSetting(inputLetter: string) {
        const indexOfInitialLetter = this.wiring.getInputLetterIndex(inputLetter)
        return this.wiring.getInputLetterByIndex(indexOfInitialLetter + (this.rotorSetting - 1))
    }

    private prepareNotchFromInput(notch: string[]): string[] {
        const notchList: string[] = []
        notch.map((notchLetter) => {
            notchList.push(notchLetter.toUpperCase())
        })
        return notchList
    }
}
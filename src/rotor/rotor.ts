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
    
    // need to better understand role of rotorPosition and ringSetting
    ringSetting = 1
    rotation = 1

    constructor({ wiring, notch }: RotorConfig) {
        this.wiring = wiring
        this.notch = this.prepareNotchFromInput(notch)
    }

    getRotation() {
        return this.rotation
    }

    setRotation(newRotation: number) {
        if (newRotation <= this.maxRotation && newRotation >= this.minRotation) {
            this.rotation = newRotation
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        }
    }

    getRingSetting() {
        return this.ringSetting
    }

    getRingSettingLetterValue() {
        //Ring setting offsets the value of the letter but also the notch
        return this.wiring.inputLetters[this.ringSetting - 1]
    }

    hasHitNotch() {
        for (let notchLetter of this.notch) {
            if (this.wiring.inputLetters.indexOf(notchLetter) == this.rotation - 1) {
                return true
            }
        }
        return false
    }

    setRingSetting(newRingSetting: number) {
        if (newRingSetting <= this.maxRotation && newRingSetting >= this.minRotation) {
            this.ringSetting = newRingSetting
            this.recalculateNotchFromRingSetting()
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        }
    }

    rotate() {
        console.log("Rotating...")
        if (this.rotation < this.maxRotation) {
            this.rotation++
            console.log("rotation " + this.rotation)
        } else if (this.rotation == this.maxRotation ) {
            this.rotation = this.minRotation
        }
    }

    input(letter: string): string {
        return this.wiring.getOutputFrom(this.adjustForRotorSetting(letter)) as string
    }

    adjustForRotorSetting(inputLetter: string) {
        const indexOfInitialLetter = this.wiring.getInputLetterIndex(inputLetter)
        return this.wiring.getInputLetterByIndex(indexOfInitialLetter + (this.rotation - 1))
    }

    private prepareNotchFromInput(notch: string[]): string[] {
        const notchList: string[] = []
        notch.map((notchLetter) => {
            notchList.push(notchLetter.toUpperCase())
        })
        return notchList
    }

    private recalculateNotchFromRingSetting() {
        const newNotch = []
        for (let notch in this.notch) {
            const notchOffset = this.wiring.getInputLetterIndex(notch)
            const notchPosition = (notchOffset + this.ringSetting) > 26 ? (notchOffset + this.ringSetting - 26) : (notchOffset + this.ringSetting)
            newNotch.push(this.wiring.getInputLetterByIndex(notchPosition))
        }
        this.notch = newNotch
    }
}
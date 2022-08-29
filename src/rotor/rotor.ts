export class Wiring {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: Map<string, string>

    constructor(wiringString: string) {
        this.wiring = this.getWiringFromString(wiringString)
    }

    getOutputFrom(letter: string) {
        return this.wiring.get(letter.toUpperCase())
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
    
    rotation = 1

    constructor({ wiring, notch }: RotorConfig) {
        this.wiring = wiring
        this.notch = this.prepareNotchFromInput(notch)
    }

    getRotationNumber() {
        return this.rotation
    }

    getRotationLetter() {
        return this.wiring.inputLetters[this.rotation - 1]
    }

    hasHitNotch() {
        for (let notchLetter of this.notch) {
            if (this.wiring.inputLetters.indexOf(notchLetter) == this.rotation - 1) {
                return true
            }
        }
        return false
    }

    setRotation(newRotation: number) {
        if (newRotation <= this.maxRotation && newRotation >= this.minRotation) {
            this.rotation = newRotation
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        }
    }

    rotate() {
        if (this.rotation < this.maxRotation) {
            this.rotation++
        } else if (this.rotation == this.maxRotation ) {
            this.rotation = this.minRotation
        }
    }

    private prepareNotchFromInput(notch: string[]): string[] {
        const notchList: string[] = []
        notch.map((notchLetter) => {
            notchList.push(notchLetter.toUpperCase())
        })
        return notchList
    }
}
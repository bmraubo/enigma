export class Wiring {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: Map<string, string>

    constructor(wiringString: string) {
        this.wiring = this.getWiringFromString(wiringString)
    }

    getWiringFromString(wiringString: string) {
        const wiring = new Map()
        let inputLetterIndex = 0
        wiringString.toUpperCase().split("").map((outcomeLetter: string) => {
            wiring.set(this.inputLetters[inputLetterIndex], outcomeLetter)
            inputLetterIndex++
        })
        return wiring
    }

    getOutputFrom(letter: string) {
        return this.wiring.get(letter.toUpperCase())
    }
}

export interface RotorConfig {
    wiring: Wiring,
    notch: string[],
}

export class Rotor {
    wiring: Wiring
    notch: string[]
    
    rotation = 1

    constructor({ wiring, notch }: RotorConfig) {
        this.wiring = wiring
        this.notch = notch
    }

    getRotationNumber() {
        return this.rotation
    }

    getRotationLetter() {
        return this.wiring.inputLetters[this.rotation - 1]
    }

    hasHitNotch() {
        for (let notchLetter of this.notch) {
            if (this.wiring.inputLetters.indexOf(notchLetter.toUpperCase()) == this.rotation - 1) {
                return true
            }
        }
        return false
    }

    setRotation(newRotation: number) {
        if (newRotation <= 26 && newRotation >= 1) {
            this.rotation = newRotation
        } else {
            throw TypeError("INVALID ROTATION SETTING ERROR")
        }
    }

    rotate() {
        if (this.rotation < 26) {
            this.rotation++
        } else if (this.rotation == 26 ) {
            this.rotation = 1
        }
    }
}
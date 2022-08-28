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
    notch: string,
    turnover: string,
}

export class Rotor {
    wiring: Wiring
    notch: string
    turnover: string
    
    rotation = 1

    constructor({ wiring, notch, turnover }: RotorConfig) {
        this.wiring = wiring
        this.notch = notch
        this.turnover = turnover
    }

    getRotationNumber() {
        return this.rotation
    }

    getRotationLetter() {
        return this.wiring.inputLetters[this.rotation - 1]
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
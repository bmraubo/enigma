export class Wiring {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    wiring: Map<string, string>

    constructor(wiringString: string) {
        this.wiring = this.getWiringFromString(wiringString)
    }

    getWiringFromString(wiringString: string) {
        const wiring = new Map()
        let inputLetterIndex = 0
        wiringString.split("").map((outcomeLetter: string) => {
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

    constructor({ wiring, notch, turnover }: RotorConfig) {
        this.wiring = wiring
        this.notch = notch
        this.turnover = turnover
    }

}
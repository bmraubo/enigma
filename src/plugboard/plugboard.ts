export class Plugboard {
    wiring: Map<String, String>;

    constructor() {
        this.wiring = this.setDefaultConnections()
    }

    setDefaultConnections() {
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let wiring = new Map()
        alphabet.split("").map((letter) => {
            wiring.set(letter, letter)
        })
        return wiring
    }

    setConnections(plugboardConnections: Map<string, string>) {
        plugboardConnections.forEach((key, value) => {
            console.log("Hello")
            this.makeConnection(key, value)
        })
    }

    makeConnection(inputLetter: string, outputLetter: string) {
        this.wiring.set(inputLetter, outputLetter)
        this.wiring.set(outputLetter, inputLetter)
    }

    input(inputLetter: string) {
        return this.wiring.get(inputLetter)
    }
}
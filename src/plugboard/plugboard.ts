export class Plugboard {
    wiring: Map<String, String>;

    constructor() {
        this.wiring = this.setDefaultConnections()
    }

    setDefaultConnections() {
        /* extract the alphabet into a global variable
        because I have lost track of how many times 
        I have had to sing the song in my head */
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
        try {
            return this.wiring.get(inputLetter) as string;
        } catch (e) {
            throw Error(`Wiring Error: ${e}`)
        }
        
    }
}
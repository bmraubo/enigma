import { ALPHABET_ARRAY } from "../global";
import { Plugboard } from "../plugboard/plugboard";
import { RotorMachine } from "../rotor/rotor-machine";

export class Enigma {
    rotorMachine: RotorMachine
    plugboard: Plugboard

    constructor(rotorMachine: RotorMachine, plugboard: Plugboard) {
        this.rotorMachine = rotorMachine
        this.plugboard = plugboard
    }

    send(inputLetter: string) {
        const forwardPlugboardOutcome = this.plugboard.input(inputLetter)
        const rotorMachineOutcome = this.rotorMachine.input(forwardPlugboardOutcome)
        const reversePlugboardOutcome = this.plugboard.input(rotorMachineOutcome)
        return reversePlugboardOutcome
    }

    input(inputText: string) {
        // break down input text into individual letters.
        // remove spaces
        // how to deal with numbers
        let result: string[] = new Array();
        inputText.split("").filter((character) => 
            {
                console.log(character)
                return ALPHABET_ARRAY.includes(character.toUpperCase()) 
            }
        ).map(letter => 
            result.push(this.send(letter))
        )
        return result.join("")
    }
}
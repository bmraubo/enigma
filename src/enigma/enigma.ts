import { Plugboard } from "../plugboard/plugboard";
import { RotorMachine } from "../rotor/rotor-machine";

export class Enigma {
    rotorMachine: RotorMachine
    plugboard: Plugboard

    constructor(rotorMachine: RotorMachine, plugboard: Plugboard) {
        this.rotorMachine = rotorMachine
        this.plugboard = plugboard
    }
}
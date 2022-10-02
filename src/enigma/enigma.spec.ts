import { Plugboard } from "../plugboard/plugboard"
import { Reflector } from "../rotor/reflector";
import { Rotor } from "../rotor/rotor";
import { RotorMachine } from "../rotor/rotor-machine";
import { Wiring } from "../rotor/wiring";
import { Enigma } from "./enigma";

describe("Enigma tests", () => {

    const createRotor = (wiringString: string, notchOffset: number[]) => {
        const rotorConfig = {
            wiring: new Wiring(wiringString),
            notchOffset: notchOffset
        }
        return new Rotor(rotorConfig)
    }

    it("takes rotor machine and a plugboard", () => {
        const rotor1 = createRotor("BCDEFGHIJKLMNOPQRSTUVWXYZA", [3])

        const rotor2 = createRotor("CDEFGHIJKLMNOPQRSTUVWXYZAB", [4])

        const rotor3 = createRotor("DEFGHIJKLMNOPQRSTUVWXYZABC", [5])
    
        const reflector = new Reflector("EFGHIJKLMNOPQRSTUVWXYZABCD");
    
        const rotorPositions = new Map();
        rotorPositions.set(1, rotor1);
        rotorPositions.set(2, rotor2);
        rotorPositions.set(3, rotor3);
    
        const rotorMachineConfig = {
        positions: rotorPositions,
        reflector: reflector,
        };
    
        const rotorMachine = new RotorMachine(rotorMachineConfig);

        const plugboard = new Plugboard()

        const enigma = new Enigma(rotorMachine, plugboard)

        expect(enigma.rotorMachine).not.toBe(null)
        expect(enigma.rotorMachine).toBeInstanceOf(RotorMachine)
        expect(enigma.plugboard).not.toBe(null)
        expect(enigma.plugboard).toBeInstanceOf(Plugboard)
    })
})
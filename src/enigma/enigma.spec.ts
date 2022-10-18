import { Plugboard } from "../plugboard/plugboard"
import { Reflector } from "../rotor/reflector";
import { Rotor } from "../rotor/rotor";
import { RotorMachine } from "../rotor/rotor-machine";
import { Wiring } from "../rotor/wiring";
import { Enigma, Operation } from "./enigma";

describe("Enigma tests", () => {
    let rotorMachine: RotorMachine;

    const createRotor = (wiringString: string, notchOffset: number[]): Rotor => {
        const rotorConfig = {
            wiring: new Wiring(wiringString),
            notchOffset: notchOffset
        }
        return new Rotor(rotorConfig)
    }

    const createRotorMachine = (rotors: Rotor[], reflector: Reflector): RotorMachine => {
        const rotorPositions = new Map();
        rotorPositions.set(1, rotors[0]);
        rotorPositions.set(2, rotors[1]);
        rotorPositions.set(3, rotors[2]);
    
        const rotorMachineConfig = {
        positions: rotorPositions,
        reflector: reflector,
        };
    
        return new RotorMachine(rotorMachineConfig);
    }

    const setUpRotorMachine = (): RotorMachine => {
        const rotor1 = createRotor("BCDEFGHIJKLMNOPQRSTUVWXYZA", [3])

        const rotor2 = createRotor("CDEFGHIJKLMNOPQRSTUVWXYZAB", [4])

        const rotor3 = createRotor("DEFGHIJKLMNOPQRSTUVWXYZABC", [5])
    
        const reflector = new Reflector("EFGHIJKLMNOPQRSTUVWXYZABCD");

        return createRotorMachine([rotor1, rotor2, rotor3], reflector)
    }

    beforeEach(() => {
        rotorMachine = setUpRotorMachine()
    })

    it("takes rotor machine and a plugboard", () => {
        const plugboard = new Plugboard()

        const enigma = new Enigma(rotorMachine, plugboard)

        expect(enigma.rotorMachine).not.toBe(null)
        expect(enigma.rotorMachine).toBeInstanceOf(RotorMachine)
        expect(enigma.plugboard).not.toBe(null)
        expect(enigma.plugboard).toBeInstanceOf(Plugboard)
    })

    it("takes an input and passes it through the plugboard and rotor machine", () => {
        const plugboard = new Plugboard()
        const enigma = new Enigma(rotorMachine, plugboard)

        const enigmaSendSpy = jest.spyOn(enigma, 'send').mockReturnValue("A")

        enigma.input("A", Operation.ENCODE)

        expect(enigmaSendSpy).toHaveBeenCalledWith("A")
    })

    it("can take a string of multiple letters", () => {
        const plugboard = new Plugboard()
        const enigma = new Enigma(rotorMachine, plugboard)

        const enigmaSendSpy = jest.spyOn(enigma, 'send').mockReturnValue("A")

        const result = enigma.input("ABCDEFG", Operation.ENCODE)

        expect(enigmaSendSpy).toHaveBeenCalledTimes(7)
        expect(result).toEqual("AAAAAAA")
    })

    it("removes spaces before sending the text to the plugboard", () => {
        const plugboard = new Plugboard()
        const enigma = new Enigma(rotorMachine, plugboard)

        const enigmaSendSpy = jest.spyOn(enigma, 'send').mockReturnValue("A")

        const result = enigma.input("A A", Operation.ENCODE)

        expect(enigmaSendSpy).toHaveBeenCalledTimes(2)
        expect(result).toEqual("AA")
    })

    it("can break down encoded message into 4 character groups if the obscure word length setting is true", () => {
        const plugboard = new Plugboard()
        const enigma = new Enigma(rotorMachine, plugboard)

        jest.spyOn(enigma, 'send').mockReturnValue("A")
        const enigmaObscureWordLengthSpy = jest.spyOn(enigma, 'obscureWordLength')

        const result = enigma.input("AAAAAAAA AAAA", Operation.ENCODE, { obscureWordLength: true })

        expect(enigmaObscureWordLengthSpy).toHaveBeenCalled()     
        expect(result).toEqual("AAAA AAAA AAAA")
    })

    it("when decoding, can obscure messages of lengths that do not divide by 4 by adding Xs on the end", () => {
        const plugboard = new Plugboard()
        const enigma = new Enigma(rotorMachine, plugboard)

        jest.spyOn(enigma, 'send').mockReturnValue("A")
        const enigmaObscureWordLengthSpy = jest.spyOn(enigma, 'obscureWordLength')

        const result = enigma.input("AAAAAAAA AAAA AA", Operation.DECODE, { obscureWordLength: true })

        expect(enigmaObscureWordLengthSpy).toHaveBeenCalled()     
        expect(result).toEqual("AAAA AAAA AAAA AAXX")
    })

    it("when encoding, can obscure messages", () => {
        const plugboard = new Plugboard()
        const enigma = new Enigma(rotorMachine, plugboard)

        jest.spyOn(enigma, 'send').mockReturnValue("A")
        const enigmaObscureWordLengthSpy = jest.spyOn(enigma, 'obscureWordLength')

        const result = enigma.input("AAAAAAAA AAAA AA", Operation.ENCODE, { obscureWordLength: true })

        expect(enigmaObscureWordLengthSpy).toHaveBeenCalled()     
        expect(result).toEqual("AAAA AAAA AAAA AAAA")
    })
})
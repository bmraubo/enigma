import { Rotor, Wiring } from "./rotor"
import { Reflector, RotorMachine } from "./rotor-machine"

describe("Rotor Machine", () => {
    let rotor1: Rotor;
    let rotor2: Rotor;
    let rotor3: Rotor;
    let reflector: Reflector;
    let rotorMachine: RotorMachine;

    // A -> B -> D -> G -> K -> N -> P -> Q

    beforeEach(() => {
        const rotor1Config = {
            wiring: new Wiring("BCDEFGHIJKLMNOPQRSTUVWXYZA"),
            notch: ["C"]
        }
        rotor1 = new Rotor(rotor1Config)

        const rotor2Config = {
            wiring: new Wiring("CDEFGHIJKLMNOPQRSTUVWXYZAB"),
            notch: ["D"]
        }
        rotor2 = new Rotor(rotor2Config)

        const rotor3Config = {
            wiring: new Wiring("DEFGHIJKLMNOPQRSTUVWXYZABC"),
            notch: ["E"]
        }
        rotor3 = new Rotor(rotor3Config)

        reflector = new Reflector("EFGHIJKLMNOPQRSTUVWXYZABCD")

        const rotorPositions = new Map()
        rotorPositions.set(1, rotor1)
        rotorPositions.set(2, rotor2)
        rotorPositions.set(3, rotor3)

        const rotorMachineConfig = {
            positions: rotorPositions,
            reflector: reflector
        }

        rotorMachine = new RotorMachine(rotorMachineConfig)
    })

    it("can take three rotors in specified positions", () => {
        expect(rotorMachine.getRotorByPosition(1)).toEqual(rotor1)
        expect(rotorMachine.getRotorByPosition(2)).toEqual(rotor2)
        expect(rotorMachine.getRotorByPosition(3)).toEqual(rotor3)
    })

    it("has a reflector", () => {
        expect(rotorMachine.reflector).toBeDefined()
    })

    it("reflector transforms input into a different output", () => {
        expect(rotorMachine.reflector.input("A")).toEqual("E")
    })

    it("can set the rotation of all rotors", () => {
        expect(rotorMachine.getRingSettings()).toEqual({
            1: 1,
            2: 1,
            3: 1,
        })

        rotorMachine.setRingSettings([23, 1, 12])

        expect(rotorMachine.getRingSettings()).toEqual({
            1: 23,
            2: 1,
            3: 12,
        })
    })

    it("takes an input which is passed through the rotors, reflected and passed through again", () => {
        expect(rotorMachine.input("A")).toEqual("Q")
    })
})
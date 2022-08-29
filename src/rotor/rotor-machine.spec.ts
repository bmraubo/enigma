import { Rotor, Wiring } from "./rotor"
import { RotorMachine } from "./rotor-machine"

describe("Rotor Machine", () => {

    it("can take three rotors in specified positions", () => {
        const rotor1Config = {
            wiring: new Wiring("BCDEFGHIJKLMNOPQRSTUVWXYZA"),
            notch: ["C"]
        }
        const rotor1 = new Rotor(rotor1Config)

        const rotor2Config = {
            wiring: new Wiring("CDEFGHIJKLMNOPQRSTUVWXYZAB"),
            notch: ["D"]
        }
        const rotor2 = new Rotor(rotor2Config)

        const rotor3Config = {
            wiring: new Wiring("DEFGHIJKLMNOPQRSTUVWXYZABC"),
            notch: ["E"]
        }
        const rotor3 = new Rotor(rotor3Config)

        const rotorPositions = new Map()
        rotorPositions.set(1, rotor1)
        rotorPositions.set(2, rotor2)
        rotorPositions.set(3, rotor3)

        const rotorMachineConfig = {
            positions: rotorPositions
        }

        const rotorMachine = new RotorMachine(rotorMachineConfig)

        expect(rotorMachine.getRotorByPosition(1)).toEqual(rotor1)
        expect(rotorMachine.getRotorByPosition(2)).toEqual(rotor2)
        expect(rotorMachine.getRotorByPosition(3)).toEqual(rotor3)
    })
})
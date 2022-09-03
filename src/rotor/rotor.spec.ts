import { CurrentDirection, Rotor, Wiring } from "./rotor";

describe("Test Rotors", () => {
    let rotor: Rotor

    beforeEach(() => {
        const wiringString = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"

        const wiring = new Wiring(wiringString)

        const rotorConfig = {
            wiring: wiring,
            notchOffset: [1],
        }

        rotor = new Rotor(rotorConfig)
    })

    it("Has a specified wiring", () => {
        expect(rotor.wiring.getOutputFrom("A", CurrentDirection.FORWARD)).toEqual("E")
        expect(rotor.wiring.getOutputFrom("D", CurrentDirection.FORWARD)).toEqual("F")
        expect(rotor.wiring.getOutputFrom("Z", CurrentDirection.FORWARD)).toEqual("J")
    })

    it("can set the RingSetting", () => {
        expect(rotor.ringSetting).toEqual(1)

        rotor.setRingSetting(4)

        expect(rotor.ringSetting).toEqual(4)
    })

    it("cannot set rotation less than 1 and more than 26", () => {
        expect(() => rotor.setRingSetting(0)).toThrow("INVALID ROTATION SETTING")
        expect(() => rotor.setRingSetting(27)).toThrow("INVALID ROTATION SETTING")
    })

    it("can be rotated one step at a time", () => {
        expect(rotor.getStep()).toEqual(1)
        rotor.rotate()
        expect(rotor.getStep()).toEqual(2)
        rotor.rotate()
        expect(rotor.getStep()).toEqual(3)
    })

    it("rotating when rotation is set to 26 will return it back to 1", () => {
        rotor.setStep(26)
        rotor.rotate()
        expect(rotor.getStep()).toEqual(1)
    })

    it("knows when rotation hits the notch", () => {
        expect(rotor.hasHitNotch()).toBe(true)
    })

    it("can handle multiple notches", () => {
        const wiringString = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"

        const wiring = new Wiring(wiringString)

        const rotorConfig = {
            wiring: wiring,
            notchOffset: [1, 2],
        }

        rotor = new Rotor(rotorConfig)

        expect(rotor.hasHitNotch()).toBe(true)
        rotor.rotate()
        expect(rotor.hasHitNotch()).toBe(true)
        rotor.rotate()
        expect(rotor.hasHitNotch()).toBe(false)
    })

    it("takes an input and gives encrypted output", () => {
        expect(rotor.input("A", CurrentDirection.FORWARD)).toEqual("E")
    })

    it("returns K from input A after rotating one step", () => {
        rotor.rotate()
        expect(rotor.input("A", CurrentDirection.FORWARD)).toEqual("J")
    })

    it("returns A from reversed input E", () => {
        expect(rotor.input("E", CurrentDirection.REVERSE)).toEqual("A")
    })
})
import { Rotor, Wiring } from "./rotor";

describe("Test Rotors", () => {
    let rotor: Rotor

    beforeEach(() => {
        const wiringString = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"

        const wiring = new Wiring(wiringString)

        const rotorConfig = {
            wiring: wiring,
            notch: ["a"],
        }

        rotor = new Rotor(rotorConfig)
    })

    it("Has a specified wiring", () => {
        expect(rotor.wiring.getOutputFrom("A")).toEqual("E")
        expect(rotor.wiring.getOutputFrom("D")).toEqual("F")
        expect(rotor.wiring.getOutputFrom("Z")).toEqual("J")
    })

    it("can set the RingSetting", () => {
        expect(rotor.ringSetting).toEqual(1)

        rotor.setRingSetting(4)

        expect(rotor.ringSetting).toEqual(4)
    })

    it("changes the position of the notch based on RingSetting", () => {
        expect(rotor.notch).toEqual(["A"])
        rotor.setRingSetting(3)
        expect(rotor.notch).toEqual(["C"])
    })

    it("cannot set rotation less than 1 and more than 26", () => {
        expect(() => rotor.setRingSetting(0)).toThrow("INVALID ROTATION SETTING")
        expect(() => rotor.setRingSetting(27)).toThrow("INVALID ROTATION SETTING")
    })

    it("can be rotated one step at a time", () => {
        expect(rotor.getRotation()).toEqual(1)
        rotor.rotate()
        expect(rotor.getRotation()).toEqual(2)
        rotor.rotate()
        expect(rotor.getRotation()).toEqual(3)
    })

    it("rotating when rotation is set to 26 will return it back to 1", () => {
        rotor.setRotation(26)
        rotor.rotate()
        expect(rotor.getRotation()).toEqual(1)
    })

    it("can convert rotation number to corresponding letter value", () => {
        expect(rotor.getRingSetting()).toEqual(1)
        expect(rotor.getRingSettingLetterValue()).toEqual("A")
        rotor.setRingSetting(3)
        expect(rotor.getRingSetting()).toEqual(3)
        expect(rotor.getRingSettingLetterValue()).toEqual("C")
        rotor.setRingSetting(26)
        expect(rotor.getRingSetting()).toEqual(26)
        expect(rotor.getRingSettingLetterValue()).toEqual("Z")
    })

    it("knows when rotation hits the notch", () => {
        expect(rotor.hasHitNotch()).toBe(true)
    })

    it("can handle multiple notches", () => {
        const wiringString = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"

        const wiring = new Wiring(wiringString)

        const rotorConfig = {
            wiring: wiring,
            notch: ["a", "b"],
        }

        rotor = new Rotor(rotorConfig)

        expect(rotor.hasHitNotch()).toBe(true)
        rotor.rotate()
        expect(rotor.hasHitNotch()).toBe(true)
        rotor.rotate()
        expect(rotor.hasHitNotch()).toBe(false)
    })

    it("takes an input and gives encrypted output", () => {
        expect(rotor.input("A")).toEqual("E")
    })
})
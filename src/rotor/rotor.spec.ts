import { Rotor, Wiring } from "./rotor";

describe("Test Rotors", () => {
    let rotor: Rotor

    beforeEach(() => {
        const wiringString = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"

        const wiring = new Wiring(wiringString)

        const rotorConfig = {
            wiring: wiring,
            notch: "a",
            turnover: "a"
        }

        rotor = new Rotor(rotorConfig)
    })

    it("Has a specified wiring", () => {
        expect(rotor.wiring.getOutputFrom("A")).toEqual("E")
        expect(rotor.wiring.getOutputFrom("D")).toEqual("F")
        expect(rotor.wiring.getOutputFrom("Z")).toEqual("J")
    })

    it("can set the Rotation", () => {
        expect(rotor.rotation).toEqual(1)

        rotor.setRotation(4)

        expect(rotor.rotation).toEqual(4)
    })

    it("cannot set rotation less than 1 and more than 26", () => {
        expect(() => rotor.setRotation(0)).toThrow("INVALID ROTATION SETTING")
        expect(() => rotor.setRotation(27)).toThrow("INVALID ROTATION SETTING")
    })

    it("can be rotated one step at a time", () => {
        expect(rotor.rotation).toEqual(1)
        rotor.rotate()
        expect(rotor.rotation).toEqual(2)
        rotor.rotate()
        expect(rotor.rotation).toEqual(3)
    })

    it("rotating when rotation is set to 26 will return it back to 1", () => {
        rotor.setRotation(26)
        rotor.rotate()
        expect(rotor.rotation).toEqual(1)
    })

    it("can convert rotation number to corresponding letter value", () => {
        expect(rotor.getRotationNumber()).toEqual(1)
        expect(rotor.getRotationLetter()).toEqual("A")
        rotor.setRotation(3)
        expect(rotor.getRotationNumber()).toEqual(3)
        expect(rotor.getRotationLetter()).toEqual("C")
        rotor.setRotation(26)
        expect(rotor.getRotationNumber()).toEqual(26)
        expect(rotor.getRotationLetter()).toEqual("Z")
    })
})
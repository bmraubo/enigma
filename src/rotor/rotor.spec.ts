import { Rotor, Wiring } from "./rotor";

describe("Test Rotors", () => {

    it("Has a specified wiring", () => {
        const wiringString = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"

        const wiring = new Wiring(wiringString)

        const rotorConfig = {
            wiring: wiring,
            notch: "a",
            turnover: "a"
        }

        const rotor = new Rotor(rotorConfig)

        expect(rotor.wiring.getOutputFrom("A")).toEqual("E")
        expect(rotor.wiring.getOutputFrom("D")).toEqual("F")
        expect(rotor.wiring.getOutputFrom("Z")).toEqual("J")
    })
})
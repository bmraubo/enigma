import { Reflector } from "./reflector";

describe("Test Reflector", () => {
    let reflector: Reflector;

    beforeEach(() => {
        const wiringString = "BCDEFGHIJKLMNOPQRSTUVWXYZA";
        reflector = new Reflector(wiringString)
    })

    it("generates wiring based on input string", () => {
        expect(reflector.wiring.get("A")).toEqual("B")
        expect(reflector.wiring.get("Z")).toEqual("A")
        expect(reflector.wiring.get("B")).toEqual("C")
    })
})
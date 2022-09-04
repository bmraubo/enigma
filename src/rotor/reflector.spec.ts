import { Reflector } from "./reflector";

describe("Test Reflector", () => {
    let reflector: Reflector;

    beforeEach(() => {
        const wiringString = "BCDEFGHIJKLMNOPQRSTUVWXYZA";
        reflector = new Reflector(wiringString)
    })

    it("generates wiring based on input string", () => {
        expect(reflector.input("A")).toEqual("B")
        expect(reflector.input("Z")).toEqual("A")
        expect(reflector.input("B")).toEqual("C")
    })
})
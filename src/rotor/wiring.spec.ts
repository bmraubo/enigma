import { CurrentDirection } from "./current-direction.enum";
import { Wiring } from "./wiring";

describe("Test Wiring", () => {
    let wiring: Wiring;

    beforeEach(() => {
        wiring = new Wiring("BCDEFGHIJKLMNOPQRSTUVWXYZA")
    })

    it("creates a forward and reverse map for wiring connections", () => {
        expect(wiring.getOutputFrom("A", CurrentDirection.FORWARD)).toEqual("B")
        expect(wiring.getOutputFrom("Z", CurrentDirection.FORWARD)).toEqual("A")
        expect(wiring.getOutputFrom("B", CurrentDirection.REVERSE)).toEqual("A")
        expect(wiring.getOutputFrom("A", CurrentDirection.REVERSE)).toEqual("Z")
    })
})
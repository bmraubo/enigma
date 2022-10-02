import { CurrentDirection } from "./current-direction.enum";
import { Wiring } from "./wiring";

describe("Test Wiring", () => {
  let wiring: Wiring;

  beforeEach(() => {
    wiring = new Wiring("BDFHJLCPRTXVZNYEIWGAKMUSQO");
  });

  it("creates a forward and reverse map for wiring connections", () => {
    expect(wiring.getOutputFrom("A", CurrentDirection.FORWARD)).toEqual("B");
    expect(wiring.getOutputFrom("Z", CurrentDirection.FORWARD)).toEqual("O");
    expect(wiring.getOutputFrom("B", CurrentDirection.REVERSE)).toEqual("A");
    expect(wiring.getOutputFrom("D", CurrentDirection.REVERSE)).toEqual("B");
  });

  it("adjusting ring setting shifts wiring", () => {
    wiring.applyRingSetting(1)
    expect(wiring.wiring["forward"].get("A")).toEqual("P")
    wiring.applyRingSetting(3)
    expect(wiring.wiring["forward"].get("A")).toEqual("V")
    wiring.applyRingSetting(10)
    expect(wiring.wiring["forward"].get("A")).toEqual("S")
  })
});

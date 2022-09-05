import { Reflector } from "./reflector";
import { Rotor } from "./rotor";
import { RotorMachine } from "./rotor-machine";
import { Wiring } from "./wiring";

describe("Rotor Machine", () => {
  let rotor1: Rotor;
  let rotor2: Rotor;
  let rotor3: Rotor;
  let reflector: Reflector;
  let rotorMachine: RotorMachine;

  beforeEach(() => {
    const rotor1Config = {
      wiring: new Wiring("BCDEFGHIJKLMNOPQRSTUVWXYZA"),
      notchOffset: [3],
    };
    rotor1 = new Rotor(rotor1Config);

    const rotor2Config = {
      wiring: new Wiring("CDEFGHIJKLMNOPQRSTUVWXYZAB"),
      notchOffset: [4],
    };
    rotor2 = new Rotor(rotor2Config);

    const rotor3Config = {
      wiring: new Wiring("DEFGHIJKLMNOPQRSTUVWXYZABC"),
      notchOffset: [5],
    };
    rotor3 = new Rotor(rotor3Config);

    reflector = new Reflector("EFGHIJKLMNOPQRSTUVWXYZABCD");

    const rotorPositions = new Map();
    rotorPositions.set(1, rotor1);
    rotorPositions.set(2, rotor2);
    rotorPositions.set(3, rotor3);

    const rotorMachineConfig = {
      positions: rotorPositions,
      reflector: reflector,
    };

    rotorMachine = new RotorMachine(rotorMachineConfig);
  });

  it("can take three rotors in specified positions", () => {
    expect(rotorMachine.getRotorByPosition(1)).toEqual(rotor1);
    expect(rotorMachine.getRotorByPosition(2)).toEqual(rotor2);
    expect(rotorMachine.getRotorByPosition(3)).toEqual(rotor3);
  });

  it("has a reflector", () => {
    expect(rotorMachine.reflector).toBeDefined();
  });

  it("reflector transforms input into a different output", () => {
    expect(rotorMachine.reflector.input("A")).toEqual("E");
  });

  it("can set the rotation of all rotors", () => {
    expect(rotorMachine.getRingSettings()).toEqual({
      1: 0,
      2: 0,
      3: 0,
    });

    rotorMachine.setRingSettings([23, 1, 12]);

    expect(rotorMachine.getRingSettings()).toEqual({
      1: 23,
      2: 1,
      3: 12,
    });
  });

  describe("Real Enigma Test", () => {
    it("returns EWTYX from AAAAA when ringSettings are [0,0,0], starting position is [0,0,0], rotorPositions are [III,II,I]", () => {
      let rotorIConfig = {
        wiring: new Wiring("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        notchOffset: [25],
      };
      let rotorI = new Rotor(rotorIConfig);

      let rotorIIConfig = {
        wiring: new Wiring("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
        notchOffset: [14],
      };
      let rotorII = new Rotor(rotorIIConfig);

      let rotorIIIConfig = {
        wiring: new Wiring("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
        notchOffset: [4],
      };
      let rotorIII = new Rotor(rotorIIIConfig);

      let realPositions = new Map();
      realPositions.set(1, rotorIII);
      realPositions.set(2, rotorII);
      realPositions.set(3, rotorI);

      let realReflector = new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");

      let realMachineConfig = {
        positions: realPositions,
        reflector: realReflector,
      };

      let realMachine = new RotorMachine(realMachineConfig);

      expect(realMachine.input("A")).toEqual("F");
      expect(realMachine.input("A")).toEqual("T");
      expect(realMachine.input("A")).toEqual("Z");
      expect(realMachine.input("A")).toEqual("M");
      expect(realMachine.input("A")).toEqual("G");
    });

    it("returns BDZOG from AAAAA when ringSettings are [0,0,0], starting position is [0,0,0], rotorPositions are [I,II,III]", () => {
      let rotorIConfig = {
        wiring: new Wiring("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
        notchOffset: [25],
      };
      let rotorI = new Rotor(rotorIConfig);

      let rotorIIConfig = {
        wiring: new Wiring("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
        notchOffset: [14],
      };
      let rotorII = new Rotor(rotorIIConfig);

      let rotorIIIConfig = {
        wiring: new Wiring("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
        notchOffset: [4],
      };
      let rotorIII = new Rotor(rotorIIIConfig);

      let realPositions = new Map();
      realPositions.set(1, rotorI);
      realPositions.set(2, rotorII);
      realPositions.set(3, rotorIII);

      let realReflector = new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");

      let realMachineConfig = {
        positions: realPositions,
        reflector: realReflector,
      };

      let realMachine = new RotorMachine(realMachineConfig);

      expect(realMachine.input("A")).toEqual("B");
      expect(realMachine.input("A")).toEqual("D");
      expect(realMachine.input("A")).toEqual("Z");
      expect(realMachine.input("A")).toEqual("G");
      expect(realMachine.input("A")).toEqual("O");
    });

    it("returns UBDZG from AAAAA when ringSettings are [0,0,1], starting position is [1,1,1], rotorPositions are [I,II,III]", () => {
        let rotorIConfig = {
            wiring: new Wiring("EKMFLGDQVZNTOWYHXUSPAIBRCJ"),
            notchOffset: [25],
          };
          let rotorI = new Rotor(rotorIConfig);
    
          let rotorIIConfig = {
            wiring: new Wiring("AJDKSIRUXBLHWTMCQGZNPYFVOE"),
            notchOffset: [14],
          };
          let rotorII = new Rotor(rotorIIConfig);
    
          let rotorIIIConfig = {
            wiring: new Wiring("BDFHJLCPRTXVZNYEIWGAKMUSQO"),
            notchOffset: [4],
          };
          let rotorIII = new Rotor(rotorIIIConfig);
    
          let realPositions = new Map();
          realPositions.set(1, rotorI);
          realPositions.set(2, rotorII);
          realPositions.set(3, rotorIII);
    
          let realReflector = new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");
    
          let realMachineConfig = {
            positions: realPositions,
            reflector: realReflector,
          };
    
          let realMachine = new RotorMachine(realMachineConfig);

          realMachine.setRingSettings([0, 0, 1])
    
          expect(realMachine.input("A")).toEqual("U");
          expect(realMachine.input("A")).toEqual("B");
          expect(realMachine.input("A")).toEqual("D");
          expect(realMachine.input("A")).toEqual("Z");
          expect(realMachine.input("A")).toEqual("G");
    })
  });
});

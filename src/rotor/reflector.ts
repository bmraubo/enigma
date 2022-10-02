export class Reflector {
    inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    wiring: Map<string, string>;
  
    constructor(wiringString: string) {
      this.wiring = this.getWiringFromString(wiringString);
    }
  
    input(inputLetter: string): string {
      const output = this.wiring.get(inputLetter) as string;
      return output;
    }
  
    private getWiringFromString(wiringString: string) {
      const wiring = new Map();
      let inputLetterIndex = 0;
      wiringString
        .toUpperCase()
        .split("")
        .map((outcomeLetter: string) => {
          wiring.set(this.inputLetters[inputLetterIndex], outcomeLetter);
          inputLetterIndex++;
        });
      return wiring;
    }
  }
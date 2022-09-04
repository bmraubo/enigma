import { CurrentDirection } from "./current-direction.enum";

export class Wiring {
  inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  wiringString: string;
  wiring: {
    forward: Map<string, string>;
    reverse: Map<string, string>;
  };

  constructor(wiringString: string) {
    this.wiringString = wiringString
    this.wiring = this.connectWiring(wiringString);
  }

  getInputLetterIndex(letter: string) {
    return this.inputLetters.indexOf(letter);
  }

  getInputLetterByIndex(index: number) {
    if (index >= 0 && index <= 25) {
      return this.inputLetters[index];
    }
    if (index < 0) {
      return this.inputLetters[index + 26];
    }
    if (index > 25) {
      return this.inputLetters[index - 26];
    }
  }

  getOutputFrom(letter: string, direction: CurrentDirection) {
    return this.wiring[direction].get(letter.toUpperCase()) as string;
  }

  applyRingSetting(ringSetting: number) {
    let newWiringString = ""
    if (ringSetting != 1) {
        // key, value = key - 1, value + 1
        for (let letter of this.inputLetters) {
            let letterIndex = this.getInputLetterIndex(letter)!
            console.log(letterIndex)
            let letterBeforeInput = this.getInputLetterByIndex(letterIndex - 1)!
            console.log(letterBeforeInput)
            let letterOutcome = this.getOutputFrom(letterBeforeInput, CurrentDirection.FORWARD)
            console.log(letterOutcome)
            let resultIndex = this.getInputLetterIndex(letterOutcome)
            console.log(resultIndex)
            let result = this.getInputLetterByIndex(resultIndex + 1)!
            console.log(result)
            newWiringString = newWiringString + result
        }
        console.log(newWiringString)
        this.wiring = this.connectWiring(newWiringString)
    }
  }

  private generateWiringMap(inputString: string, outputString: string) {
    const wiringMap = new Map();
    let inputLetterIndex = 0;
    outputString
      .toUpperCase()
      .split("")
      .map((outcomeLetter: string) => {
        wiringMap.set(inputString[inputLetterIndex], outcomeLetter);
        inputLetterIndex++;
      });
    return wiringMap;
  }

  private connectWiring(wiringString: string) {
    return {
      forward: this.generateWiringMap(this.inputLetters, wiringString),
      reverse: this.generateWiringMap(wiringString, this.inputLetters),
    };
  }
}

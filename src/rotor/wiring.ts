import { CurrentDirection } from "./current-direction.enum";

export class Wiring {
  inputLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  defaultWiringString: string;
  wiring: {
    forward: Map<string, string>;
    reverse: Map<string, string>;
  };

  constructor(wiringString: string) {
    this.defaultWiringString = wiringString
    this.wiring = this.connectWiring(wiringString);
  }

  getInputLetterIndex(letter: string) {
    return this.inputLetters.indexOf(letter);
  }

  getInputLetterByIndex(index: number) {
    console.log("input index: " + index)
    if (index >= 0 && index <= 25) {
      console.log("between 0 and 25")
      return this.inputLetters[index];
    }
    if (index < 0) {
      console.log(`less than 25: ${index + 26}`)

      return this.inputLetters[index + 26];
    }
    if (index > 25) {
     console.log(`more than 25: ${index - 26}`)

      return this.inputLetters[index - 26];
    }
  }

  getOutputFrom(letter: string, direction: CurrentDirection) {
    return this.wiring[direction].get(letter.toUpperCase()) as string;
  }

  applyRingSetting(ringSetting: number) {
    let newWiringString = ""
    this.connectDefaultWiring()
    if (ringSetting > 0) {
        // key, value = key  1, value + 1
        for (let letter of this.inputLetters) {
            let letterIndex = this.getInputLetterIndex(letter)!
            let letterBeforeInput = this.getInputLetterByIndex(letterIndex - Math.abs(ringSetting))!
            console.log(letterBeforeInput)
            let letterOutcome = this.getOutputFrom(letterBeforeInput, CurrentDirection.FORWARD)
            console.log(letterOutcome)
            let resultIndex = this.getInputLetterIndex(letterOutcome)
            let result = this.getInputLetterByIndex(resultIndex + (ringSetting))!
            console.log(result)
            newWiringString = newWiringString + result
        }
        console.log(newWiringString)
        this.wiring = this.connectWiring(newWiringString)
    }
  }

  private connectDefaultWiring() {
    console.log("default " + this.defaultWiringString)
    this.wiring = this.connectWiring(this.defaultWiringString)
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

  private adjustForRingSetting(letterIndex: number, ringSetting: number) {
    if ((letterIndex - ringSetting) >= 0) {
        return ringSetting - 1
    }
    if ((letterIndex - ringSetting) < 0) {
        return ringSetting + 1
    }
  }
}

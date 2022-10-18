import { ALPHABET_ARRAY } from "../global";
import { Plugboard } from "../plugboard/plugboard";
import { RotorMachine } from "../rotor/rotor-machine";

export interface EnigmaOptions {
    obscureWordLength?: boolean;
    textBlockSize?: number;
}

const defaultEnigmaOptions = {
    obscureWordLength: false,
    textBlockSize: 4,
};

export enum Operation {
    ENCODE = "encode",
    DECODE = "decode",
}

export class Enigma {
    rotorMachine: RotorMachine;
    plugboard: Plugboard;

    constructor(rotorMachine: RotorMachine, plugboard: Plugboard) {
        this.rotorMachine = rotorMachine;
        this.plugboard = plugboard;
    }

    send(inputLetter: string): string {
        const forwardPlugboardOutcome = this.plugboard.input(inputLetter);
        const rotorMachineOutcome = this.rotorMachine.input(
            forwardPlugboardOutcome
        );
        const reversePlugboardOutcome =
            this.plugboard.input(rotorMachineOutcome);
        return reversePlugboardOutcome;
    }

    input(
        inputText: string,
        operation: Operation,
        options: EnigmaOptions = defaultEnigmaOptions
    ): string {
        // break down input text into individual letters.
        // remove spaces
        // how to deal with numbers
        // let result: string[] = new Array();
        let resultString: string;

        const padTextString = (textString: string) => {
            const desiredLength =
                textString.length +
                (textString.length % (options.textBlockSize || 4));
            return textString.padEnd(desiredLength, "X");
        };

        const performOperation = (inputString: string): string => {
            let result: string[] = new Array();
            inputString
                .split("")
                .map(letter => result.push(this.send(letter)))
            return result.join("")
        };

        const prepareInput = (inputString: string): string => {
            return inputString
                .split("")
                .filter((character) =>
                    ALPHABET_ARRAY.includes(character.toUpperCase())
                ).join("")
        }

        /*
        if options.obscureWordLength
            - if ENCODE - padText and performOperation (can pad text again, it wont do anything)
            - if decode - perform operation and pad Text
        */

        // if (options.obscureWordLength) {
        //     const processedText = performOperation(padTextString(inputText))
        //     this.obscureWordLength(processedText, options.textBlockSize || 4);
        //     return padTextString(processedText)
        // }

        let preparedInput = prepareInput(inputText)
        if (operation == Operation.ENCODE && options.obscureWordLength) {
            console.log(1, preparedInput)
            preparedInput = padTextString(preparedInput);
            console.log(2, preparedInput)
        }
        resultString = performOperation(preparedInput);
        if (options.obscureWordLength) {
            if (operation == Operation.DECODE) {
                resultString = padTextString(resultString);
            }
            console.log(3, resultString)
            const thing = this.obscureWordLength(resultString, options.textBlockSize || 4);
            console.log(4, thing)
            return thing
        }
        return resultString;
    }

    obscureWordLength(inputText: string, textBlockSize: number): string {
        let obscuredText: string[] = new Array();
        let textBlock = 1;
        while (textBlock <= Math.floor(inputText.length / textBlockSize)) {
            const blockStartIndex = textBlock * textBlockSize - textBlockSize;
            const blockEndIndex = textBlock * textBlockSize;
            obscuredText.push(inputText.slice(blockStartIndex, blockEndIndex));
            textBlock++;
        }
        console.log(obscuredText);
        return obscuredText.join(" ");
    }
}

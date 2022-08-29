import { Rotor } from "./rotor"

export interface RotorMachineConfig {
    positions: Map<number, Rotor>
}

export class RotorMachine {
    positions: Map<number, Rotor>

    constructor(rotorMachineConfig: RotorMachineConfig) {
        this.positions = rotorMachineConfig.positions
    }

    getRotorByPosition(position: number) {
        return this.positions.get(position)
    }
}
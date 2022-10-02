import { Plugboard } from "./plugboard"

describe("Plugboard tests", () => {

    it("When no connections are set, the plugboard will return the input letter", () => {
        const plugboard = new Plugboard()

        expect(plugboard.input("A")).toEqual("A")
        expect(plugboard.input("N")).toEqual("N")
        expect(plugboard.input("D")).toEqual("D")
    })

    it("When A is connected to B, input of A is modified to B", () => {
        const plugboard = new Plugboard()

        const plugboardConnections = new Map()
        plugboardConnections.set("A", "B")

        plugboard.setConnections(plugboardConnections)

        expect(plugboard.input("A")).toEqual("B")
    })

    it("When A is connected to B, input of B is modified to A", () => {
        const plugboard = new Plugboard()

        const plugboardConnections = new Map()
        plugboardConnections.set("A", "B")

        plugboard.setConnections(plugboardConnections)

        expect(plugboard.input("B")).toEqual("A") 
    })
})
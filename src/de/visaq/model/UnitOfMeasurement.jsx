/**
 * The class is a data container. It is the equivalent to the class UnitOfMeasurement in the Backend.
 */
export default class UnitOfMeasurement {
    /**
     * Sole constructor of the class.
     *
     * @param {Object} json     The UnitofMeasurement as JSON Object.
     */
    constructor(json) {
        this.json = json;
    }

    /**
     * Returns the symbol.
     */
    get symbol() {
        return this.json.symbol;
    }

    /**
     * Returns the name.
     */
    get name() {
        return this.json.name;
    }

    /**
     * Returns the definition.
     */
    get definition() {
        return this.json.definition;
    }
};

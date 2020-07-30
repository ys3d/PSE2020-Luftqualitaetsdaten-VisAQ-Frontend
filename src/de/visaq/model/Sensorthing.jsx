/**
 * The class is a data container. It is the equivalent to the class Sensorthing in the Backend.
 */
export default class Sensorthing {
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} json     The Sensorthing as JSON Object
     */
    constructor(json) {
        this.json = json;
    }

    /**
     * Returns the id.
     */
    get id() {
        return this.json.id;
    }

    /**
     * Returns the selfURL.
     */
    get selfUrl() {
        return this.json.selfUrl;
    }
};

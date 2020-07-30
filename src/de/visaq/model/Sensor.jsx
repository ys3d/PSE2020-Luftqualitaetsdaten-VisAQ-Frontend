import Sensorthing from "./Sensorthing";

/**
 * The class is a data container. It is the equivalent to the class ObservedProperty in the Backend.
 */
export default class Sensor extends Sensorthing {
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} json     The Sensor as JSON Object 
     */
    constructor(json) {
        super(json);
    }

    /**
     * Returns the description.
     */
    get description() {
        return this.json.description;
    }

    /**
     * Returns the name.
     */
    get name() {
        return this.json.name;
    }

    /**
     * Returns the Datastream Link.
     */
    get datastreamsLink() {
        return this.json.datastreamsLink;
    }

    /**
     * Returns the properties.
     */
    get properties() {
        return this.json.properties;
    }

    /**
     * Parses the Sensor into a JSON Object.
     */
    toJSON() {
        return {
            id: this.id,
            selfUrl: this.selfUrl,
            description: this.description,
            name: this.name,
            datastreamsLink: this.datastreamsLink,
            properties: this.properties,
            "@type": "Sensor"
        };
    }
};

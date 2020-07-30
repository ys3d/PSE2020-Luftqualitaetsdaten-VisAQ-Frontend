import Sensorthing from "./Sensorthing";

/**
 * The class is a data container. It is the equivalent to the class Location in the Backend.
 */
export default class Location extends Sensorthing {
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} json     The Location as JSON Object 
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
     * Returns the location.
     */
    get location() {
        return this.json.location;
    }

    /**
     * Returns the Historical Location Link.
     */
    get historicalLocationsLink() {
        return this.json.historicalLocationsLink;
    }

    /**
     * Returns the Thing Link.
     */
    get thingLink() {
        return this.json.thingLink;
    }

    /**
     * Parses the Location into a JSON Object.
     */
    toJSON() {
        return {
            id: this.id,
            selfUrl: this.selfUrl,
            description: this.description,
            name: this.name,
            historicalLocationsLink: this.historicalLocationsLink,
            thingLink: this.thingLink,
            "@type": "Location"
        };
    }
};

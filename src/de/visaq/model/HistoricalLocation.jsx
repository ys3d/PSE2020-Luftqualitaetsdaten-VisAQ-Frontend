import Sensorthing from "./Sensorthing";
/**
 * The class is a data container. It is the equivalent to the class HistoricalLocation in the Backend.
 */
export default class HistoricalLocation extends Sensorthing {
    /**
     * The Sole constructor of the class.
     * 
     * @param {Object} json     The HistoricalLocation as JSON Object
     */
    constructor(json) {
        super(json);
    }

    /**
     * Returns the time.
     */
    get time() {
        return this.json.time;
    }

    /**
     * Returns the Thing Link.
     */
    get thingLink() {
        return this.json.thingLink;
    }

    /**
     * Returns the Location Link.
     */
    get locationsLink() {
        return this.json.locationsLink;
    }

    /**
     * Parses the HistoricalLocation into a JSON Object.
     */    
    toJSON() {
        return {
            id: this.id,
            selfUrl: this.selfUrl,
            time: this.time,
            thingLink: this.thingLink,
            locationsLink: this.locationsLink,
            "@type": "HistoricalLocation"
        };
    }
};

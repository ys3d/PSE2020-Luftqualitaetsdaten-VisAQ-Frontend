import Sensorthing from "./Sensorthing";
import Location from "./Location";

/**
 * The class is a data container. It is the equivalent to the class Thing in the Backend.
 */
export default class Thing extends Sensorthing {
    
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} json     The Thing as JSON Object.
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
     * Returns the DataStream Link.
     */
    get datastreamsLink() {
        return this.json.datastreamsLink;
    }

    /**
     * Returns the HistoricalLocation Link.
     */
    get historicalLocationsLink() {
        return this.json.historicalLocationsLink;
    }

    /**
     * Returns the LocationLink.
     */
    get locationsLink() {
        return this.json.locationsLink;
    }

    /**
     * Returns a cached Location if possible.
     */
    get locations() {
        var cachedLocations = this.json.locationsLink.cachedSensorthing;

        if (!Array.isArray(cachedLocations)) {
            return undefined;
        }

        var locations = new Array(cachedLocations.length);

        cachedLocations.forEach((entry, index) => {
            locations[index] = new Location(entry);
        });

        return locations;
    }

    /**
     * Parses the Thing into a JSON Object.
     */
    toJSON() {
        return {
            id: this.id,
            selfUrl: this.selfUrl,
            description: this.description,
            name: this.name,
            datastreamsLink: this.datastreamsLink,
            historicalLocationsLink: this.historicalLocationsLink,
            locationsLink: this.locationsLink,
            "@type": "Thing"
        };
    }
};

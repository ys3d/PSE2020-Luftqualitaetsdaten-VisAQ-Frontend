import Sensorthing from "./Sensorthing";
import Location from "./Location";

export default class Thing extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get description() {
        return this.json.description;
    }

    get name() {
        return this.json.name;
    }

    get datastreamsLink() {
        return this.json.datastreamsLink;
    }

    get historicalLocationsLink() {
        return this.json.historicalLocationsLink;
    }

    get locationsLink() {
        return this.json.locationsLink;
    }

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

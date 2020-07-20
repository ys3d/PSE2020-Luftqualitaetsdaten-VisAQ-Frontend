import Sensorthing from "./Sensorthing";

export default class Location extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get description() {
        return this.json.description;
    }

    get name() {
        return this.json.name;
    }

    get location() {
        return this.json.location;
    }

    get historicalLocationsLink() {
        return this.json.historicalLocationsLink;
    }

    get thingLink() {
        return this.json.thingLink;
    }

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

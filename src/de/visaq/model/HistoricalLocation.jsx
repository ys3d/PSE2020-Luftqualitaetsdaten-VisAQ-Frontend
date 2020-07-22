import Sensorthing from "./Sensorthing";

export default class HistoricalLocation extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get time() {
        return this.json.time;
    }

    get thingLink() {
        return this.json.thingLink;
    }

    get locationsLink() {
        return this.json.locationsLink;
    }

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

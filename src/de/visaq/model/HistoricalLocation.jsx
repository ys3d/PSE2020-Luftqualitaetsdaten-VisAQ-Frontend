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
};

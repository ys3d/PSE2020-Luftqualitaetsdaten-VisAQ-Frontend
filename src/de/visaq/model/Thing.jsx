import Sensorthing from "./Sensorthing";

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
};

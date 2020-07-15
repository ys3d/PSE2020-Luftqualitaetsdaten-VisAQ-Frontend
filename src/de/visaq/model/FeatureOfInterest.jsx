import Sensorthing from "./Sensorthing";

export default class FeatureOfInterest extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get description() {
        return this.json.description;
    }

    get name() {
        return this.json.name;
    }

    get observationsLink() {
        return this.json.observationsLink;
    }

    get features() {
        return this.json.features;
    }
};

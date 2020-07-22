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

    toJSON() {
        return {
            id: this.id,
            selfUrl: this.selfUrl,
            description: this.description,
            name: this.name,
            observationsLink: this.observationsLink,
            features: this.features,
            "@type": "FeatureOfInterest"
        };
    }
};

import Sensorthing from "./Sensorthing";

export default class Observation extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get phenomenonTime() {
        return this.json.phenomenonTime;
    }

    get result() {
        return this.json.result;
    }

    get resultTime() {
        return this.json.resultTime;
    }

    get datastreamLink() {
        return this.json.datastreamLink;
    }

    get featureOfInterestLink() {
        return this.json.featureOfInterestLink;
    }

    toJSON() {
        return {
            id: this.id,
            selfUrl: this.selfUrl,
            phenomenonTime: this.phenomenonTime,
            result: this.result,
            resultTime: this.resultTime,
            featureOfInterestLink: this.featureOfInterestLink,
            "@type": "Observation"
        };
    }
};

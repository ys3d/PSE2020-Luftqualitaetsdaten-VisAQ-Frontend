import Sensorthing from "./Sensorthing";

/**
 * The class is a data container. It is the equivalent to the class Observation in the Backend.
 */
export default class Observation extends Sensorthing {
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} json     The Observation as JSON Object
     */
    constructor(json) {
        super(json);
    }

    /**
     * Returns the time of the phenomenon.
     */
    get phenomenonTime() {
        return this.json.phenomenonTime;
    }

    /**
     * Returns the result.
     */
    get result() {
        return this.json.result;
    }

    /**
     * Returns the result time.
     */
    get resultTime() {
        return this.json.resultTime;
    }

    /**
     * Returns the Datastream Link.
     */
    get datastreamLink() {
        return this.json.datastreamLink;
    }

    /**
     * Returns the FeatureofInterest Link.
     */
    get featureOfInterestLink() {
        return this.json.featureOfInterestLink;
    }

    /**
     * Parses the Observation into a JSON Object.
     */
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

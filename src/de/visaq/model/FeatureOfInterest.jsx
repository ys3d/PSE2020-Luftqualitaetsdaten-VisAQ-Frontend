import Sensorthing from "./Sensorthing";

/**
 * The class is a data container. It is the equivalent to the class FeatureOfInterest in the Backend.
 */
export default class FeatureOfInterest extends Sensorthing {
    /**
     * Sole Constructor of the class.
     * 
     * @param {Object} json     The FeatureOfInterest as JSON Object      
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
     * Returns the Observation Link.
     */
    get observationsLink() {
        return this.json.observationsLink;
    }

    /**
     * Returns the feature.
     */
    get features() {
        return this.json.features;
    }

    /**
     * Parses the Datastream into a JSON Object.
     */
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

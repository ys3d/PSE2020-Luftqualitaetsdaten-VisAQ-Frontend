import Sensorthing from "./Sensorthing";
import UnitOfMeasurement from "./UnitOfMeasurement";

/**
 * The class is a data container. It is the equivalent to the class Datastream in the Backend.
 */
export default class Datastream extends Sensorthing {

    /**
     * Returns the Datastream's description.
     */
    get description() {
        return this.json.description;
    }

    /**
     * Returns the Datastream's name.
     */
    get name() {
        return this.json.name;
    }

    /**
     * Returns the Unit of Measurement.
     */
    get unitOfMeasurement() {
        return new UnitOfMeasurement(this.json.unitOfMeasurement);
    }

    /**
     * Returns the Observation Type Link.
     */
    get observationTypeLink() {
        return this.json.observationTypeLink;
    }

    /**
     * Returns the Observartion Link.
     */
    get observationsLink() {
        return this.json.observationsLink;
    }

    /**
     * Returns the Sensor Link.
     */
    get sensorLink() {
        return this.json.sensorLink;
    }

    /**
     * Returns the Thing Link.
     */
    get thingLink() {
        return this.json.thingLink;
    }

    /**
     * Returns the Observed Property Link.
     */
    get observedPropertyLink() {
        return this.json.observedPropertyLink;
    }

    /**
     * Returns the Properties.
     */
    get properties() {
        return this.json.properties;
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
            unitOfMeasurement: this.unitOfMeasurement,
            observationTypeLink: this.observationTypeLink,
            observationsLink: this.observationsLink,
            sensorLink: this.sensorLink,
            thingLink: this.thingLink,
            observedPropertyLink: this.observedPropertyLink,
            properties: this.properties,
            "@type": "Datastream"
        };
    }
};

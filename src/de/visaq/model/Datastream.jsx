import Sensorthing from "./Sensorthing";
import UnitOfMeasurement from "./UnitOfMeasurement";

export default class Datastream extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get description() {
        return this.json.description;
    }

    get name() {
        return this.json.name;
    }

    get unitOfMeasurement() {
        return new UnitOfMeasurement(this.json.unitOfMeasurement);
    }

    get observationTypeLink() {
        return this.json.observationTypeLink;
    }

    get observationsLink() {
        return this.json.observationsLink;
    }

    get sensorLink() {
        return this.json.sensorLink;
    }

    get thingLink() {
        return this.json.thingLink;
    }

    get observedPropertyLink() {
        return this.json.observedPropertyLink;
    }

    get properties() {
        return this.json.properties;
    }


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

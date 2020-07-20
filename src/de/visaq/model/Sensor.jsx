import Sensorthing from "./Sensorthing";

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

    get datastreamsLink() {
        return this.json.datastreamsLink;
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
            datastreamsLink: this.datastreamsLink,
            properties: this.properties,
            "@type": "Sensor"
        };
    }
};

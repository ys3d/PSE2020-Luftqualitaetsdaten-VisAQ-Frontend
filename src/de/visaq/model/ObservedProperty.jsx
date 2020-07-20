import Sensorthing from "./Sensorthing";

export default class ObservedProperty extends Sensorthing {
    constructor(json) {
        super(json);
    }

    get description() {
        return this.json.description;
    }

    get name() {
        return this.json.name;
    }

    get definition() {
        return this.json.definition;
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
            definition: this.definition,
            datastreamsLink: this.datastreamsLink,
            properties: this.properties,
            "@type": "ObservedProperty"
        };
    }
};

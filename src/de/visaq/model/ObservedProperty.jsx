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
};

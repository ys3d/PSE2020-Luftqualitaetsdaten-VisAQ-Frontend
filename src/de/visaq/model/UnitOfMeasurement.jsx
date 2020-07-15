export default class UnitOfMeasurement {
    constructor(json) {
        this.json = json;
    }

    get symbol() {
        return this.json.symbol;
    }

    get name() {
        return this.json.name;
    }

    get definition() {
        return this.json.definition;
    }
};

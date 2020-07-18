export default class Sensorthing {
    constructor(json) {
        this.json = json;
    }

    get id() {
        return this.json.id;
    }

    get selfLink() {
        return this.json.selfLink;
    }
};

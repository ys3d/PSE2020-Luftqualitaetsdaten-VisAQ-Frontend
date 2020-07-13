import Sensorthing from "./Sensorthing";

class Thing extends Sensorthing {

    constructor(id, selfLink, description, name, datastreamsLink, historicalLocationsLink, locationsLink) {
        super(id, selfLink);
        this.description = description;
        this.name = name;
        this.datastreamsLink = datastreamsLink;
        this.historicalLocationsLink = historicalLocationsLink;
        this.locationsLink = locationsLink;
    }
}

export default Thing;

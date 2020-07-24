/**
 * 
 */
export default class PointDatum {

    constructor(json)  {
        this.json = json;
    }
    
    get location() {
        return this.json.location;
    }
    
    get datum() {
        return this.json.datum;
    }
};
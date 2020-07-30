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
        return parseInt(this.json.datum);
    }
};
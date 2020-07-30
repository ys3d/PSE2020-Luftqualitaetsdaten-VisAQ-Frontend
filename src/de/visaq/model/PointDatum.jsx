/**
 * The class is a data container. It is the equivalent to the class PointDatum in the Backend.
 */
export default class PointDatum {

    /**
     * Sole constructor of the class.
     * 
     * @param {Object} json     The PointDatum as JSON Object
     */
    constructor(json)  {
        this.json = json;
    }
    
    /**
     * Returns the location.
     */
    get location() {
        return this.json.location;
    }
    
    /**
     * Returns the datum.
     */
    get datum() {
        return parseInt(this.json.datum);
    }
};
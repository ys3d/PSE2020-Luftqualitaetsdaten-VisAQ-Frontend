/**
 * Contains the content of an air quality data.
 */
export default class AirQualityData {
    /**
     * Sole constructor of the class. Initializes the classes state.
     * 
     * @param {Object} props The class properties
     */
    constructor(props)  {
        this.name = props.name;
        this.primaryColor = props.primaryColor;
        this.secondaryColor = props.secondaryColor;
        this.average = parseInt(props.average);
        this.variance = parseInt(props.variance);
        this.unitOfMeasurement = props.unitOfMeasurement;
    }
    
    /**
     * Returns the name.
     */
    getName() {
        return this.name;
    }
    
    /**
     * Returns the primary color.
     */
    getPrimaryColor() {
        return this.primaryColor;
    }

    /**
     * Returns the secondary color.
     */
    getSecondaryColor() {
        return this.secondaryColor;
    }
    
    /**
     * Returns the average.
     */
    getAverage() {
        return this.average;
    }
    
    /**
     * Returns the variance.
     */
    getVariance()   {
        return this.variance;
    }
    
    /**
     * Returns the unit of measurement.
     */
    getUnitOfMeasurement() {
        return this.unitOfMeasurement;
    }
}



export default class AirQualityData {
    constructor(props)  {
        this.name = props.name;
        this.primaryColor = props.primaryColor;
        this.secondaryColor = props.secondaryColor;
        this.average = parseInt(props.average);
        this.variance = parseInt(props.variance);
        this.unitOfMeasurement = props.unitOfMeasurement;
    }
    
    getName() {
        return this.name;
    }
    
    getPrimaryColor() {
        return this.primaryColor;
    }

    getSecondaryColor() {
        return this.secondaryColor;
    }
    
    getAverage() {
        return this.average;
    }
    
    getVariance()   {
        return this.variance;
    }
    
    getUnitOfMeasurement() {
        return this.unitOfMeasurement;
    }

}

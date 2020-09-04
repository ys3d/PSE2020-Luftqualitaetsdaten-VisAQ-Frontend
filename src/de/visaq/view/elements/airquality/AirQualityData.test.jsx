import AirQualityData from '../airquality/AirQualityData';
import * as data from '../../../../../resources/AirQualityData.json';

const particulateMatter = new AirQualityData(data.particulateMatter);
const humidity = new AirQualityData(data.humidity);

test("Standart init", () => {
    AirQualityData.instance = null;
    expect(equalsAirQualityData(humidity, AirQualityData.getInstance())).toBeFalsy();
    expect(equalsAirQualityData(particulateMatter, AirQualityData.getInstance())).toBeTruthy();
});

test("Set instance to humidity test", () => {
    AirQualityData.setInstance(particulateMatter);
    expect(equalsAirQualityData(particulateMatter, AirQualityData.getInstance())).toBeTruthy();
    AirQualityData.setInstance(humidity);
    expect(equalsAirQualityData(humidity, AirQualityData.getInstance())).toBeTruthy();
});

test("Getter test", () => {
    AirQualityData.setInstance(particulateMatter);
    const instance = AirQualityData.getInstance();
    expect(equalsAirQualityData(particulateMatter, instance)).toBeTruthy();
    expect(instance.getName()).toBe(particulateMatter.name);
    expect(instance.getPrimaryColor()).toBe(particulateMatter.primaryColor);
    expect(instance.getSecondaryColor()).toBe(particulateMatter.secondaryColor);
    expect(instance.getAverage()).toBe(particulateMatter.average);
    expect(instance.getVariance()).toBe(particulateMatter.variance);
    expect(instance.getUnitOfMeasurement()).toBe(particulateMatter.unitOfMeasurement);
});

function equalsAirQualityData(aq1, aq2) {
    let state = true;
    state = state && (aq1.name === aq2.name);
    state = state && (aq1.primaryColor === aq2.primaryColor);
    state = state && (aq1.secondaryColor === aq2.secondaryColor);
    state = state && (aq1.average === aq2.average);
    state = state && (aq1.variance === aq2.variance);
    state = state && (aq1.unitOfMeasurement === aq2.unitOfMeasurement);
    return state;
}
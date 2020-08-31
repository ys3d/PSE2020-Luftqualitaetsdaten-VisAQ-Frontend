import Datastream from './Datastream';
import UnitOfMeasurement from './UnitOfMeasurement';
import FeatureOfInterest from './FeatureOfInterest';
import HistoricalLocation from './HistoricalLocation';
import Location from './Location';
import Observation from './Observation';
import ObservedProperty from './ObservedProperty';
import Sensor from './Sensor';
import Thing from './Thing';
import Sensorthing from './Sensorthing';
import PointDatum from './PointDatum';

test("Datastream Parse", () => {
    const datastream = new Datastream(JSON.parse(`
    {
        "@type":"Datastream",
        "id":"saqn:ds:9c44b0f",
        "selfUrl":"https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')",
        "name":"PM10 Datastream of Crowdsensing Node (SDS011)",
        "description":"Datastream for recording Particulate Matter",
        "observationTypeLink":"http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
        "sensorLink":{
            "@type":"SingleOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Sensor"
        },
        "thingLink":{
            "@type":"SingleOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Thing"
        },
        "observationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Observations"
        },
        "unitOfMeasurement":{
            "symbol":"ug/m^3",
            "name":"microgram per cubic meter",
            "definition":"http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter"
        },
        "observedPropertyLink":{
            "@type":"SingleOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/ObservedProperty"
        },
        "properties":{
            "test": "ok"
        }
    }
    `));

    expect(datastream.description).toBe('Datastream for recording Particulate Matter');
    expect(datastream.name).toBe('PM10 Datastream of Crowdsensing Node (SDS011)');
    expect(datastream.unitOfMeasurement.name).toBe('microgram per cubic meter');
    expect(datastream.unitOfMeasurement.symbol).toBe('ug/m^3');
    expect(datastream.unitOfMeasurement.definition).toBe('http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter');
    expect(datastream.observationTypeLink).toBe('http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement');
    expect(datastream.observationsLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Observations");
    expect(datastream.sensorLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Sensor");
    expect(datastream.thingLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Thing");
    expect(datastream.observedPropertyLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/ObservedProperty");
    expect(datastream.properties.test).toBe("ok");
    expect(new Datastream(datastream.toJSON())).not.toBe(undefined);
});

test("FeatureOfinterest Parse", () => {
    const foi = new FeatureOfInterest(JSON.parse(`
    {
        "@type":"FeatureOfInterest",
        "id":"00111d4a-6a54-11ea-9010-b38c006c8fab",
        "selfUrl":"https://api.smartaq.net/v1.0/FeaturesOfInterest('00111d4a-6a54-11ea-9010-b38c006c8fab')",
        "description":"des",
        "name":"na",
        "observationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/FeaturesOfInterest('00111d4a-6a54-11ea-9010-b38c006c8fab')/Observations"
        },
        "features":{
            "coordinates":[10.940840979,48.346737738,3.8],
            "type":"Point"
        }
    }
    `));

    expect(foi.description).toBe('des');
    expect(foi.name).toBe('na');
    expect(foi.observationsLink.url).toBe('https://api.smartaq.net/v1.0/FeaturesOfInterest(\'00111d4a-6a54-11ea-9010-b38c006c8fab\')/Observations');
    expect(foi.features.type).toBe('Point');
    expect(new FeatureOfInterest(foi.toJSON())).not.toBe(undefined);
});

test("HistoricalLocation Parse", () => {
    const hl = new HistoricalLocation(JSON.parse(`
    {
        "@type":"HistoricalLocation",
        "id":"66c68826-9cdd-11e9-a024-ffbd2647ca86",
        "selfUrl":"https://api.smartaq.net/v1.0/HistoricalLocations('66c68826-9cdd-11e9-a024-ffbd2647ca86')",
        "time":"2019-07-02T15:23:53.749Z",
        "thingLink":{
            "@type":"SingleOnlineLink",
            "url":"https://api.smartaq.net/v1.0/HistoricalLocations('66c68826-9cdd-11e9-a024-ffbd2647ca86')/Thing"
        },
        "locationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/HistoricalLocations('66c68826-9cdd-11e9-a024-ffbd2647ca86')/Locations"
        }
    }
    `));

    expect(hl.time).toBe('2019-07-02T15:23:53.749Z');
    expect(hl.thingLink.url).toBe("https://api.smartaq.net/v1.0/HistoricalLocations('66c68826-9cdd-11e9-a024-ffbd2647ca86')/Thing");
    expect(hl.locationsLink.url).toBe("https://api.smartaq.net/v1.0/HistoricalLocations('66c68826-9cdd-11e9-a024-ffbd2647ca86')/Locations");
    expect(new HistoricalLocation(hl.toJSON())).not.toBe(undefined);
});

test("Location Parse", () => {
    const lc = new Location(JSON.parse(`
    {
        "@type":"Location",
        "id":"geo:49.012615,8.415800,nan",
        "selfUrl":"https://api.smartaq.net/v1.0/Locations('geo%3A49.012615%2C8.415800%2Cnan')",
        "name":"nam",
        "description":"des",
        "location":{
            "x":8.4158,
            "y":49.01262
        },
        "historicalLocationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Locations('geo%3A49.012615%2C8.415800%2Cnan')/HistoricalLocations"
        },
        "thingsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Locations('geo%3A49.012615%2C8.415800%2Cnan')/Things"
        }
    }
    `));

    expect(lc.name).toBe('nam');
    expect(lc.description).toBe('des');
    expect(lc.location.x).toBe(8.4158);
    expect(lc.location.y).toBe(49.01262);
    expect(lc.historicalLocationsLink.url).toBe("https://api.smartaq.net/v1.0/Locations('geo%3A49.012615%2C8.415800%2Cnan')/HistoricalLocations");
    expect(lc.thingsLink.url).toBe("https://api.smartaq.net/v1.0/Locations('geo%3A49.012615%2C8.415800%2Cnan')/Things");
    expect(new Location(lc.toJSON())).not.toBe(undefined);
});

test("Observation Parse", () => {
    const ob = new Observation(JSON.parse(`
    {
        "@type":"Observation",
        "id":"saqn:o:wa062248d4941ca66fcd89a5c78b72b1a3e7ab192",
        "selfUrl":"https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Awa062248d4941ca66fcd89a5c78b72b1a3e7ab192')",
        "phenomenonTime":"2020-08-31T11:46:52Z",
        "result":21.09,
        "resultTime":"2020-08-31T11:46:52Z",
        "datastreamLink":{
            "@type":"SingleOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Awa062248d4941ca66fcd89a5c78b72b1a3e7ab192')/Datastream"
        },
        "featureOfInterestLink":{
            "@type":"SingleOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Awa062248d4941ca66fcd89a5c78b72b1a3e7ab192')/FeatureOfInterest"
        }
    }
    `));

    expect(ob.phenomenonTime).toBe("2020-08-31T11:46:52Z");
    expect(ob.result).toBe(21.09);
    expect(ob.resultTime).toBe("2020-08-31T11:46:52Z");
    expect(ob.datastreamLink.url).toBe("https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Awa062248d4941ca66fcd89a5c78b72b1a3e7ab192')/Datastream");
    expect(ob.featureOfInterestLink.url).toBe("https://api.smartaq.net/v1.0/Observations('saqn%3Ao%3Awa062248d4941ca66fcd89a5c78b72b1a3e7ab192')/FeatureOfInterest");
    expect(new Observation(ob.toJSON())).not.toBe(undefined);
});

test("ObservedProperty Parse", () => {
    const op = new ObservedProperty(JSON.parse(`
    {
        "name" : "Relative Humidity",
        "description" : "Relative humidity is the ratio of the partial pressure of water vapor to the equilibrium vapor pressure of water at a given temperature.",
        "properties" : {
            "test": "ok"
        },
        "definition" : "http://cfconventions.org/Data/cf-standard-names/63/build/cf-standard-name-table.html#relative_humidity",
        "id" : "saqn:op:hur",
        "datastreamsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/ObservedProperties('saqn%3Aop%3Ahur')/Datastreams"
        }
    }
    `));

    expect(op.name).toBe("Relative Humidity");
    expect(op.description).toBe("Relative humidity is the ratio of the partial pressure of water vapor to the equilibrium vapor pressure of water at a given temperature.");
    expect(op.definition).toBe("http://cfconventions.org/Data/cf-standard-names/63/build/cf-standard-name-table.html#relative_humidity");
    expect(op.datastreamsLink.url).toBe("https://api.smartaq.net/v1.0/ObservedProperties('saqn%3Aop%3Ahur')/Datastreams");
    expect(op.properties.test).toBe("ok");
    expect(new ObservedProperty(op.toJSON())).not.toBe(undefined);
});

test("Sensor Parse", () => {
    const se = new Sensor(JSON.parse(`
    {
        "@type":"Sensor",
        "id":"saqn:s:9682e37",
        "selfUrl":"https://api.smartaq.net/v1.0/Sensors('saqn%3As%3A9682e37')",
        "description":"A sensor measuring PM10 using Beta ray absorption",
        "name":"generic Beta ray absorption sensor",
        "datastreamsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Sensors('saqn%3As%3A9682e37')/Datastreams"
        },
        "properties": {
            "test": "ok"
        }
    }
    `));

    expect(se.name).toBe("generic Beta ray absorption sensor");
    expect(se.description).toBe("A sensor measuring PM10 using Beta ray absorption");
    expect(se.datastreamsLink.url).toBe("https://api.smartaq.net/v1.0/Sensors('saqn%3As%3A9682e37')/Datastreams");
    expect(se.properties.test).toBe("ok");
    expect(new Sensor(se.toJSON())).not.toBe(undefined);
});

test("Thing Parse", () => {
    const th = new Thing(JSON.parse(`
    {
        "@type":"Thing",
        "id":"saqn:t:62d4572",
        "selfUrl":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')",
        "description":"Low Cost Node Measuring Particulate Matter",
        "name":"Crowdsensing Node (SDS011, 659899, IGUA)",
        "datastreamsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/Datastreams"
        },
        "historicalLocationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/HistoricalLocations"
        },
        "locationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/Locations",
            "cachedSensorthing":[
                {
                    "@type":"Location",
                    "id":"0273e8fa-7f09-11ea-b47b-8b6e851879ee",
                    "selfUrl":"https://api.smartaq.net/v1.0/Locations('0273e8fa-7f09-11ea-b47b-8b6e851879ee')",
                    "name":"",
                    "description":"",
                    "location":{
                        "x":10.98286964811327,
                        "y":48.39223947321389
                    },
                    "historicalLocationsLink":null,
                    "thingsLink":null
                }
            ]
        }
    }
    `));
    const th2 = new Thing(JSON.parse(`
    {
        "@type":"Thing",
        "id":"saqn:t:62d4572",
        "selfUrl":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')",
        "description":"Low Cost Node Measuring Particulate Matter",
        "name":"Crowdsensing Node (SDS011, 659899, IGUA)",
        "datastreamsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/Datastreams"
        },
        "historicalLocationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/HistoricalLocations"
        },
        "locationsLink":{
            "@type":"MultiOnlineLink",
            "url":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/Locations",
            "cachedSensorthing": {}
        }
    }
    `));

    expect(th.name).toBe("Crowdsensing Node (SDS011, 659899, IGUA)");
    expect(th.description).toBe("Low Cost Node Measuring Particulate Matter");
    expect(th.datastreamsLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/Datastreams");
    expect(th.historicalLocationsLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/HistoricalLocations");
    expect(th.locationsLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')/Locations");
    expect(th.locations).not.toBe(undefined);
    expect(th.locations[0].id).toBe("0273e8fa-7f09-11ea-b47b-8b6e851879ee");
    expect(th2.locations).toBe(undefined);
    expect(new Thing(th.toJSON())).not.toBe(undefined);
});

test("UnitOfMeasurement Parse", () => {
    const um = new UnitOfMeasurement(JSON.parse(`
    {
        "symbol":"ug/m^3",
        "name":"microgram per cubic meter",
        "definition":"http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter"
    }
    `));

    expect(um.name).toBe("microgram per cubic meter");
    expect(um.symbol).toBe("ug/m^3");
    expect(um.definition).toBe("http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter");
});

test("Sensorthing Parse", () => {
    const st = new Sensorthing(JSON.parse(`
    {
        "id":"saqn:t:62d4572",
        "selfUrl":"https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')"
    }
    `));

    expect(st.id).toBe("saqn:t:62d4572");
    expect(st.selfUrl).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3A62d4572')");
});

test("PointDatum Parse", () => {
    const pd = new PointDatum(JSON.parse(`
    {
        "location":"test",
        "datum":3.14
    }
    `));

    expect(pd.location).toBe("test");
    expect(pd.datum).toBe(3);
});
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
    const ds = new Datastream(JSON.parse(`
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

    expect(ds.description).toBe('Datastream for recording Particulate Matter');
    expect(ds.name).toBe('PM10 Datastream of Crowdsensing Node (SDS011)');
    expect(ds.unitOfMeasurement.name).toBe('microgram per cubic meter');
    expect(ds.unitOfMeasurement.symbol).toBe('ug/m^3');
    expect(ds.unitOfMeasurement.definition).toBe('http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html#KilogramPerCubicMeter');
    expect(ds.observationTypeLink).toBe('http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement');
    expect(ds.observationsLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Observations");
    expect(ds.sensorLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Sensor");
    expect(ds.thingLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/Thing");
    expect(ds.observedPropertyLink.url).toBe("https://api.smartaq.net/v1.0/Datastreams('saqn%3Ads%3A9c44b0f')/ObservedProperty");
    expect(ds.properties.test).toBe("ok");

    const ds2 = new Datastream(ds.toJSON());
    expect(ds2).not.toBe(undefined);
    expect(ds2.description).toBe(ds.description);
    expect(ds2.name).toBe(ds.name);
    expect(ds2.unitOfMeasurement.name).toBe(ds.unitOfMeasurement.name);
    expect(ds2.unitOfMeasurement.symbol).toBe(ds.unitOfMeasurement.symbol);
    expect(ds2.unitOfMeasurement.definition).toBe(ds.unitOfMeasurement.definition);
    expect(ds2.observationTypeLink).toBe(ds.observationTypeLink);
    expect(ds2.observationsLink.url).toBe(ds.observationsLink.url);
    expect(ds2.sensorLink.url).toBe(ds.sensorLink.url);
    expect(ds2.thingLink.url).toBe(ds.thingLink.url);
    expect(ds2.observedPropertyLink.url).toBe(ds.observedPropertyLink.url);
    expect(ds2.properties.test).toBe(ds.properties.test);
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

    const foi2 = new FeatureOfInterest(foi.toJSON())
    expect(foi2).not.toBe(undefined);
    expect(foi2.description).toBe(foi.description);
    expect(foi2.name).toBe(foi.name);
    expect(foi2.observationsLink.url).toBe(foi.observationsLink.url);
    expect(foi2.features.type).toBe(foi.features.type);
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

    const hl2 = new HistoricalLocation(hl.toJSON());
    expect(hl2).not.toBe(undefined);
    expect(hl2.time).toBe(hl.time);
    expect(hl2.thingLink.url).toBe(hl.thingLink.url);
    expect(hl2.locationsLink.url).toBe(hl.locationsLink.url);
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

    const lc2 = new Location(lc.toJSON());
    expect(lc2).not.toBe(undefined);
    expect(lc2.name).toBe(lc.name);
    expect(lc2.description).toBe(lc.description);
    expect(lc2.location.x).toBe(lc.location.x);
    expect(lc2.location.y).toBe(lc.location.y);
    expect(lc2.historicalLocationsLink.url).toBe(lc.historicalLocationsLink.url);
    expect(lc2.thingsLink.url).toBe(lc.thingsLink.url);
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
    
    const ob2 = new Observation(ob.toJSON());
    expect(ob2).not.toBe(undefined);
    expect(ob2.phenomenonTime).toBe(ob.phenomenonTime);
    expect(ob2.result).toBe(ob.result);
    expect(ob2.resultTime).toBe(ob.resultTime);
    expect(ob2.datastreamLink.url).toBe(ob.datastreamLink.url);
    expect(ob2.featureOfInterestLink.url).toBe(ob.featureOfInterestLink.url);
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

    const op2 = new ObservedProperty(op.toJSON());
    expect(op2).not.toBe(undefined);
    expect(op2.name).toBe(op.name);
    expect(op2.description).toBe(op.description);
    expect(op2.definition).toBe(op.definition);
    expect(op2.datastreamsLink.url).toBe(op.datastreamsLink.url);
    expect(op2.properties.test).toBe(op.properties.test);
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

    const se2 = new Sensor(se.toJSON());
    expect(se2).not.toBe(undefined);
    expect(se2.name).toBe(se.name);
    expect(se2.description).toBe(se.description);
    expect(se2.datastreamsLink.url).toBe(se.datastreamsLink.url);
    expect(se2.properties.test).toBe(se.properties.test);
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

    const th3 = new Thing(th.toJSON());
    expect(th3).not.toBe(undefined);
    expect(th3.name).toBe(th.name);
    expect(th3.description).toBe(th.description);
    expect(th3.datastreamsLink.url).toBe(th.datastreamsLink.url);
    expect(th3.historicalLocationsLink.url).toBe(th.historicalLocationsLink.url);
    expect(th3.locationsLink.url).toBe(th.locationsLink.url);
    expect(th3.locations).not.toBe(undefined);
    expect(th3.locations[0].id).toBe(th.locations[0].id);
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
import request from "./Request";
import Thing from "../model/Thing";
import Datastream from "../model/Datastream";
import ObservedProperty from "../model/ObservedProperty";

test("Requests the Thing saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017", () => {
    const aliveThing = new Thing(JSON.parse(`
    {
        "id": "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017",
        "selfLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')"
        },
        "description": "Mid Cost Device Measuring Particulate Matter",
        "name": "Scientific Scout EDM80 NEPH SN17017",
        "datastreamsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Datastreams"
        },
        "historicalLocationsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/HistoricalLocations"
        },
        "locationsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Locations"
        }
    }
    `));

    return request("/api/thing/id", true, {
        id: "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017"
    }, Thing).then(thing => {
        expect(thing.id).toBe(aliveThing.id);
        expect(thing.description).toBe(aliveThing.description);
        expect(thing.name).toBe(aliveThing.name);
        expect(thing.datastreamsLink.url).toBe(aliveThing.datastreamsLink.url);
        expect(thing.historicalLocationsLink.url).toBe(aliveThing.historicalLocationsLink.url);
        expect(thing.locationsLink.url).toBe(aliveThing.locationsLink.url);
    });
});

test("Requests the Datastreams of the Thing saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017", () => {
    const aliveThing = new Thing(JSON.parse(`
    {
        "id": "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017",
        "selfLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')"
        },
        "description": "Mid Cost Device Measuring Particulate Matter",
        "name": "Scientific Scout EDM80 NEPH SN17017",
        "datastreamsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Datastreams"
        },
        "historicalLocationsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/HistoricalLocations"
        },
        "locationsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Locations"
        }
    }
    `));

    return request("/api/thing/all", true, {}, Thing).then(th => {
        expect(th).not.toBe(undefined)
        expect(Array.isArray(th)).toBe(true);
    });
});

test("Requests illegal id Datastream", () => {
    return request("/api/datastream/id", true, {
        id: "illegal"
    }, Datastream).then(dt => {
        expect(dt).toBe(null);
    });
});

test("Requests absolut", () => {
    const aliveThing = new Thing(JSON.parse(`
    {
        "id": "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017",
        "selfLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')"
        },
        "description": "Mid Cost Device Measuring Particulate Matter",
        "name": "Scientific Scout EDM80 NEPH SN17017",
        "datastreamsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Datastreams"
        },
        "historicalLocationsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/HistoricalLocations"
        },
        "locationsLink": {
            "url": "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Locations"
        }
    }
    `));

    return request("http://api2.visaq.de/api/thing/id", false, {
        id: "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017"
    }, Thing).then(thing => {
        expect(thing.id).toBe(aliveThing.id);
        expect(thing.description).toBe(aliveThing.description);
        expect(thing.name).toBe(aliveThing.name);
        expect(thing.datastreamsLink.url).toBe(aliveThing.datastreamsLink.url);
        expect(thing.historicalLocationsLink.url).toBe(aliveThing.historicalLocationsLink.url);
        expect(thing.locationsLink.url).toBe(aliveThing.locationsLink.url);
    });
});
import Request from "./Request";
import Thing from "../model/Thing";

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

    return Request.post("/api/thing/id", true, {
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

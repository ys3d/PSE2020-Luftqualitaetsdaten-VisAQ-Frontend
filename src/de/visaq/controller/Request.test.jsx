import request from "./Request";
import Thing from "../model/Thing";

test("Requests the Thing saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017", () => {
    const aliveThing = new Thing("saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017",
    "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')",
    "Mid Cost Device Measuring Particulate Matter", "Scientific Scout EDM80 NEPH SN17017",
    "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Datastreams",
    "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/HistoricalLocations",
    "https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Locations");

    return request("/api/thing/id", true, {
        id: "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017"
    }, Thing).then(thing => {
        expect(thing.id).toBe("saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017");
        expect(thing.selfLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')");
        expect(thing.description).toBe("Mid Cost Device Measuring Particulate Matter");
        expect(thing.name).toBe("Scientific Scout EDM80 NEPH SN17017");
        expect(thing.datastreamsLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Datastreams");
        expect(thing.historicalLocationsLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/HistoricalLocations");
        expect(thing.locationsLink.url).toBe("https://api.smartaq.net/v1.0/Things('saqn%3At%3Agrimm-aerosol.com%3AEDM80NEPH%3ASN17017')/Locations");
    });
});

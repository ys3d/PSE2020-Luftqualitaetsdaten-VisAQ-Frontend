const ENTRY_POINT = "http://api.visaq.de:8080";

export default function request(url, relative, params, model) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    url = relative ? ENTRY_POINT + url : url;
    return fetch(url, requestOptions).then(response => {
        return response.json();
    }).then(data => {
        if (Array.isArray(data)) {
            var models = new Array(data.length);

            data.forEach((entry, index) => {
                models[index] = new model(entry);
            });

            return models;
        }
        return new model(data);
    });
};

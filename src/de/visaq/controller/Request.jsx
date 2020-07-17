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
        return new model(data);
    });
};

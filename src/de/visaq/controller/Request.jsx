const ENTRY_POINT = "http://api.visaq.de:8080";
const LOCAL_ENTRY_POINT = "http://localhost:8080";
const DEBUG = true;

/**
 * Sends requests to the VisAQ Backend.
 *
 * @param {String} url          The url
 * @param {Object} relative     true or false
 * @param {Object} params       The paremeters for the query
 * @param {Object} model        The class container for the response
 */
export default function request(url, relative, params, model) {
    console.log(Date.now())

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    url = relative ? (DEBUG ? LOCAL_ENTRY_POINT : ENTRY_POINT) + url : url;
    return fetch(url, requestOptions).then(response => {
        return response.json();
    }).then(data => {
        if (Array.isArray(data)) {
            var models = new Array(data.length);

            data.forEach((entry, index) => {
                models[index] = entry == null ? null : new model(entry);
            });

            return models;
        }
        return new model(data);
    }, () => {
        return null;
    });
};

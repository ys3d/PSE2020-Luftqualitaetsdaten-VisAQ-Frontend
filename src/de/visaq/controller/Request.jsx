export default class Request {
    static ENTRY_POINT = "https://api2.visaq.de";
    static LOCAL_ENTRY_POINT = "http://localhost:8080";
    static DEBUG = false;

    /**
     * Sends requests to the VisAQ Backend.
     *
     * @param {String} url          The url
     * @param {Object} relative     true or false
     * @param {Object} params       The paremeters for the query
     * @param {Object} model        The class container for the response
     */
    static post(url, relative, params, model) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };
        url = relative ? (Request.DEBUG ? Request.LOCAL_ENTRY_POINT : Request.ENTRY_POINT) + url : url;
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
    }
}

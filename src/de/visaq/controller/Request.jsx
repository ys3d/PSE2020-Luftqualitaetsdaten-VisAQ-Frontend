async function request(url, params, model) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    return fetch(url, requestOptions).then(response => {
        return Object.assign(new model(), response.json());
    });
}

export default request;

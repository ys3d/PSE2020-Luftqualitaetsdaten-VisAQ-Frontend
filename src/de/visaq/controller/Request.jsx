async function request(url, params, stateName, model) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    this.setState({ [stateName]: Object.assign(new model(), data) });
}

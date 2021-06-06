async function request(address, method = 'GET', params = null, headers = { 'content-type': 'application/json' }) {
    return new Promise(async(resolve, reject) => {
        
        let config = {
            method: `${method}`, // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        };

        if (method === 'POST') {
            config['body'] = JSON.stringify(params) // body data type must match "Content-Type" header
        }

        try {
            const response = await fetch(address, config);
            const json = await response.json();
            resolve(json);
        } catch (e) {
            console.error(e);
            reject(e);
        }

    });
}

export {
    request
}
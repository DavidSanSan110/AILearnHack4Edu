import fetch from 'node-fetch';

export const makeAPIRequest = async (url, method, params = {}) => {
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return await response.json();
};
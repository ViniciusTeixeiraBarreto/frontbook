import { BASE_URL } from '../env';

export const apiFetchPublicGet = async (endpoint) => {
    const res = await fetch(`${BASE_URL + endpoint}`,    {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        'Host': 'http://localhost:3000',
        'Accept': 'application/json',
        }
    });

    const json = await res.json();

    return json;
};

export const apiFetchPublicPost = async (endpoint, body = {}, method = "POST") => {
    console.log(body)
    
    const res = await fetch(BASE_URL + endpoint, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const json = await res.json();

    return json;
};
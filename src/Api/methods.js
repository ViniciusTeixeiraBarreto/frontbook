import { BASE_URL } from '../env';
import qs from "qs";

export const Get = async (endpoint) => {
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

export const Post = async (endpoint, body = {}, method = "POST", url_param = false) => {    
    let url = `${BASE_URL + endpoint}` 
    if (url_param){
        url += `?${qs.stringify(body)}`
    }

    const res = await fetch(url, {
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
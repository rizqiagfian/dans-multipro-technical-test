import axios from 'axios'
import { config } from '../config/config'

const header = () => {
    return {
        'content-type': 'application/json',
        // 'x-api-key': apikey,
        // 'x-access-token': getToken()
    }
}

export const login = async (param) => {
    try {
        const configure = {
            method: "POST",
            data: param,
            url: config.apiUrl +'/login',
            headers: header(),
        };
        const { data } = await axios(configure);
        return data;
    } catch (err) {
        const { data } = (await err.response) ? err.response : "";
        return data;
    }
};
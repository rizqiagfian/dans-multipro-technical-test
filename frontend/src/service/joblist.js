import axios from 'axios'
import { config } from '../config/config'

const header = () => {
    return {
        'content-type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('userLogin'))?.token
    }
}

export const jobList = async (param) => {
    try {
        const configure = {
            method: "POST",
            data: param,
            url: config.apiUrl + '/findall',
            headers: header(),
        };
        const { data } = await axios(configure);
        return data;
    } catch (err) {
        const { data } = (await err.response) ? err.response : "";
        return data;
    }
};
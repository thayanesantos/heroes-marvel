import axios from "axios";
import { MD5 } from "crypto-js";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});



api.interceptors.request.use(async config => {
    const timestamp = Number(new Date())
    config.params = config.params || {};
    config.params['apikey'] = process.env.REACT_APP_PUBLIC_API_KEY;
    config.params['ts'] = timestamp;
    config.params['hash'] = MD5(timestamp + process.env.REACT_APP_PRIVATE_API_KEY + process.env.REACT_APP_PUBLIC_API_KEY).toString();

    return config
});

export default api;
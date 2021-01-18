import axios from 'axios';

const api = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5001'
            : process.env.REACT_APP_PRODUCTION_API_PROXY_URL,
    timeout: 30000
});

console.log(process.env.REACT_APP_PRODUCTION_API_PROXY_URL);
export default api;

import axios from "axios";
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { GRAPH_VERIFY_TOKEN } = process.env;

export const facebookApi = axios.create({
    baseURL: "https://graph.facebook.com/v21.0",
    timeout: 1000,
    headers: {
        'Authorization': `Bearer ${GRAPH_VERIFY_TOKEN}`,
        'Content-Type': 'application/json'
    }
});
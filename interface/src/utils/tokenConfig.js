import axios from "axios";

export async function getTokenConfig(access_token) {
    return axios.get(`${process.env.REACT_APP_API_URL}/token/config`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })
}

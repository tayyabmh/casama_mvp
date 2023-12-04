import axios from 'axios';

async function getClientCredentials(user, access_token) {
    return axios.get(`${process.env.REACT_APP_API_URL}/auth/get_credentials`,{
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    })
}

export async function returnCreds(user, access_token) {
    try {
        const {client_id, client_secret} = (await getClientCredentials(user, access_token)).data;
        return {client_id, client_secret};
    }
    catch(err) {
        throw(err);
    }
}

// eslint-disable-next-line no-unused-vars
async function getCasamaAdminAccessToken() {
    return axios.post(`${process.env.REACT_APP_ISSUER_BASE_URL}oauth/token`, {
        client_id: process.env.REACT_APP_CASAMA_CLIENT_ID,
        client_secret: process.env.REACT_APP_CASAMA_CLIENT_SECRET,
        grant_type: 'client_credentials',
        audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const jwt_decode = require('jwt-decode');
const axios = require('axios');
const ethers = require('ethers');

function parseTenantFromJWT(jwt) {
    const token = jwt_decode(jwt);
    const tenant_name = token['https://api.casama.xyz/metadata'].tenant_name;
    return tenant_name;
}

function parseUserIDfromJWT(jwt) {
    const token = jwt_decode(jwt);
    return token;
}

async function getCasamaAccessTokenForAuth0Api() {
    const response = await axios.post(`${process.env.ISSUER_BASE_URL}oauth/token`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'client_credentials',
        audience: `${process.env.ISSUER_BASE_URL}api/v2/`
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data.access_token;
}

async function sendETH(signer, toWallet, amount) {
    return signer.sendTransaction({
        to: toWallet,
        value: ethers.utils.parseEther(amount),
        gasLimit: 1000000,
    })
}

function getUserIfClientRequest(payload) {
    if (payload.sub.endsWith('clients')) {
        return payload['https://api.casama.xyz/metadata'].username;
    } else {
        return payload.sub;
    }
}

module.exports = { parseTenantFromJWT, parseUserIDfromJWT, getCasamaAccessTokenForAuth0Api, sendETH, getUserIfClientRequest };
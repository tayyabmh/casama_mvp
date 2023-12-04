const authValidator = require('../validators/authValidator');
const authCollection = require('../db/authCollection');
const utils = require('../util/utils');
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')


async function getAuthCredentials(request, response) {
    const user = request.auth.payload.sub;


    const db_response = await authCollection.getOrgCredentials(user);

    response.status(200).send(db_response);
}

async function saveAuthCredentials(request, response) {
    const app_id = request.body.app_id;
    const app_secret = request.body.app_secret;
    const org_id = request.body.org_id;

    authValidator.validateSaveCredentials(app_id, app_secret, org_id);
    let newCredentials = {
        app_id,
        app_secret,
        org_id
    }


    const db_response = await authCollection.saveOrgCredentials(newCredentials);
    response.status(200).send(db_response);
}

async function createAuthCredentialsForUser(casama_access_token, user) {
    const client_response = (await createAuth0Client(user, casama_access_token)).data;
    const client_grant_response = (await createAuth0ClientGrant(client_response.client_id, casama_access_token)).data;

    await authCollection.saveClientCredentialsForUser(user, client_response.client_id, client_response.client_secret);

    return {
        client_id: client_response.client_id,
        client_secret: client_response.client_secret
    }
            
}

async function createAuth0Client(user, casama_access_token) {
    return axios.post(`${process.env.ISSUER_BASE_URL}api/v2/clients`, {
            name: user,
            grant_types: ["client_credentials"],
            client_metadata: {
                "username": user
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${casama_access_token}`
            }
        })
}

async function createAuth0ClientGrant(client_id, casama_access_token) {
    return axios.post(`${process.env.ISSUER_BASE_URL}api/v2/client-grants`, {
            client_id: client_id,
            audience: process.env.API_AUDIENCE,
            scope: ["read:credentials"]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${casama_access_token}`
        }
    })
}

module.exports = { getAuthCredentials, saveAuthCredentials, createAuthCredentialsForUser }
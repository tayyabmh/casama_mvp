require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// File Imports
const walletsController = require('./controllers/walletsController');
const authController = require('./controllers/authController');
const tokenController = require('./controllers/tokenController');
const blockchainController = require('./controllers/blockchainController');
const incentivesController = require('./controllers/incentivesController');

const app = express();
const port = (process.env.PORT || 8000);



app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const checkJwt = auth({
    audience: process.env.API_AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL
});

// BASE ENDPOINT
app.get('/', (req,res) => {
    res.status(200).json({
        "response": "Casama API Version 0.1"
    })
})


// AUTH ENDPOINTS
app.get('/auth/get_credentials', checkJwt, authController.getAuthCredentials);
app.post('/auth/save_credentials', checkJwt, requiredScopes('write:client_credentials'), authController.saveAuthCredentials)

// WALLET ENDPOINTS
app.post('/wallets', checkJwt, walletsController.createWallet)
app.get('/wallets', checkJwt, walletsController.getWalletById)
app.get('/wallets/list', checkJwt, walletsController.getAllWallets)

// TOKENS ENDPOINTS
app.post('/token/distribute', checkJwt, tokenController.distributeToken)
app.post('/token/launch', checkJwt, tokenController.launchToken)
app.get('/token/config', checkJwt, tokenController.getTokenConfig)

// INCENTIVE ENDPOINTS
app.post('/incentives', checkJwt, incentivesController.createIncentive)
app.get('/incentives', checkJwt, incentivesController.getAllIncentives)

// BLOCKCHAIN ENDPOINTS
app.get('/blockchain/get_balance', checkJwt, blockchainController.getBalance)
app.get('/blockchain/get_supply', checkJwt, blockchainController.getSupply)

// ADMIN BLOCKCHAIN ENDPOINTS
// TODO: Add scope requirements for these endpoints
app.post('/admin/blockchain/gasfund', checkJwt, blockchainController.gasFund)

// 

// This runs the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
});
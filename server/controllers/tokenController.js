const util = require('../util/utils');
const ethers = require('ethers');
const erc20 = require('../constants/casama_erc20.json');
const tokenCollection = require('../db/tokenCollection');
const walletsCollection = require('../db/walletsCollection');
const authController = require('../controllers/authController');
const axios = require('axios');
const pendoTracking = require('../util/pendoTracking');

require('dotenv').config();


const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_PROVIDER = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_API_KEY);
const { CASAMA_WALLET_PRIVATE_KEY } = process.env;


const casamaWalletInstance = new ethers.Wallet( CASAMA_WALLET_PRIVATE_KEY, ALCHEMY_PROVIDER );



async function distributeToken(request, response) {
    // Check to see if the call is coming from an API or the Casama UI
    let user = util.getUserIfClientRequest(request.auth.payload)
    

    const toAddress = request.body.toAddress;
    if (!ethers.utils.isAddress(toAddress)) {
        response.status(400).send({
            "message": "Invalid address"
        });
        return;
    }
    const amount = request.body.amount;
    if (amount <= 0) {
        response.status(400).send({
            "message": "Invalid amount"
        });
        return;
    }

    const tokenConfig = await tokenCollection.getTokenConfig(user);
    const walletConfig = await walletsCollection.getWalletConfig(user);

    const walletPrivateKey = new ethers.Wallet(walletConfig.wallet.signingKeys.privateKey, ALCHEMY_PROVIDER);


    const tokenContract = new ethers.Contract(tokenConfig.tokenContractAddress, erc20.abi, ALCHEMY_PROVIDER);

    const contractWithSigner = tokenContract.connect(walletPrivateKey);

    const contractAmountToSend = ethers.utils.parseUnits(amount.toString(), 18);

    const txn_hash = await contractWithSigner.transfer(toAddress, contractAmountToSend);
    
    await pendoTracking.trackDistributionCalls(user);
    
    response.status(200).send({
        message: "Token sent successfully",
        transactionHash: txn_hash.hash,
    })

}

async function launchToken(request, response) {
    // TODO: Check if user already has a token launched.
    let user = request.auth.payload.sub;
    const tokenName = request.body.tokenName;
    const tokenSymbol = request.body.tokenSymbol;
    // TODO: Launch a token with the following information based on the user's token settings
    let newEthWallet = ethers.Wallet.createRandom();

    try {
    const casama_access_token = await util.getCasamaAccessTokenForAuth0Api();

    const walletWithKeys = {
        address: newEthWallet.address,
        signingKeys: newEthWallet._signingKey(),
        _mneumonic: newEthWallet._mnemonic(),
    }

    await util.sendETH(casamaWalletInstance, newEthWallet.address, '0.05');

    const createCreds = await authController.createAuthCredentialsForUser(casama_access_token, user);
    

    axios.post(`${process.env.ISSUER_BASE_URL}oauth/token`, {
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        grant_type: 'client_credentials',
        audience: `${process.env.ISSUER_BASE_URL}api/v2/`
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const accessToken = res.data.access_token;
        axios.patch(`${process.env.ISSUER_BASE_URL}api/v2/users/${user}`, {
            user_metadata: {
                tokenLaunched: true,
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
        }).catch(err => {
            console.error("ERROR: ", err);
        })
    }).catch(err => {console.error(err)});
    
    // I am paying the gas fee for this transaction
    const factory = new ethers.ContractFactory(erc20.abi, erc20.bytecode, casamaWalletInstance);

    const contract = await factory.deploy(newEthWallet.address, tokenName, tokenSymbol);

    const txn_hash = (await contract.deployTransaction.wait()).transactionHash;

    // Store all the relevant information about the token in the database
    tokenCollection.saveTokenConfig(user, tokenName, tokenSymbol, contract.address, txn_hash);
    walletsCollection.saveWalletConfig(user, walletWithKeys);
    
    
    response.status(200).send({
        "message": "Token launched successfully",
        "txn_hash": txn_hash,
    });
} catch (err) {
    response.status(500).send({err})
}
    
}


async function getTokenConfig(request, response) {
    const user = request.auth.payload.sub;
    const tokenConfig = await tokenCollection.getTokenConfig(user);
    response.status(200).send(tokenConfig);
}

module.exports = { distributeToken, launchToken, getTokenConfig } 

const ethers = require('ethers');
const walletsCollection = require('../db/walletsCollection');
const utils = require('../util/utils.js');

async function createWallet(request, response ){
    const user = utils.getUserIfClientRequest(request.auth.payload);
    const walletData = request.body;
    // Validate that the User ID was passed in the request
    if (!walletData.id) {
        response.status(401).send({
            "message": "User ID is required"
        });
        return;
    }

    // Create new Wallet
    const newWallet = ethers.Wallet.createRandom();
    const walletDocument = {
        user_id: user,
        wallet_id: walletData.id,
        wallet_metadata: {},
        wallet: {
            address: newWallet.address,
            signingKeys: newWallet._signingKey()
        }
    }

    if (walletData.wallet_metadata) {
        walletDocument.wallet_metadata = walletData.wallet_metadata;
    }

    const db_response = await walletsCollection.insertNewWalletToDatabase(walletDocument);


    response.status(200).send(db_response)

}

async function getAllWallets(request, response) {
    const user = utils.getUserIfClientRequest(request.auth.payload);
    const db_response = await walletsCollection.getAllWallets(user);
    response.status(200).send(db_response);
}

async function getWalletById(request, response) {
    const user = utils.getUserIfClientRequest(request.auth.payload);
    const walletId = request.body.id;
    const db_response = await walletsCollection.getWalletById(user, walletId);
    response.status(200).send(db_response);
}


module.exports = { createWallet, getAllWallets, getWalletById }
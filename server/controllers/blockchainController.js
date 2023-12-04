const ethers = require('ethers')
const utils = require('../util/utils');
const erc20 = require('../constants/casama_erc20.json');
const tokenCollection = require('../db/tokenCollection');
const walletsCollection = require('../db/walletsCollection');

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_PROVIDER = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_API_KEY);
const { CASAMA_WALLET_PRIVATE_KEY } = process.env;

const casamaWalletInstance = new ethers.Wallet( CASAMA_WALLET_PRIVATE_KEY, ALCHEMY_PROVIDER );


async function gasFund(request, response) {
    const toAddress = request.body.toAddress;
    const amount = request.body.amount;

    const txn_hash = await utils.sendETH(casamaWalletInstance, toAddress, amount);

    response.status(200).send({
        txn_hash
    })
}

async function getBalance(request, response) {
    const user = request.auth.payload.user;

    response.status(200).send({})
}

async function getSupply(request, response) {
    const user = utils.getUserIfClientRequest(request.auth.payload);

    // Get the token contract address
    const tokenConfig = await tokenCollection.getTokenConfig(user);
    const tokenAddress = tokenConfig.tokenContractAddress;

    // Get the Org's wallet address
    const userWallet = await walletsCollection.getWalletConfig(user);
    const userWalletAddress = userWallet.wallet.address;

    // Get the token supply
    const tokenContract = new ethers.Contract(tokenAddress, erc20.abi, ALCHEMY_PROVIDER);
    const totalSupply = 1_000_000_000;
    const remainingSupplyBN = await tokenContract.balanceOf(userWalletAddress);
    const remainingSupply = parseFloat(ethers.utils.formatEther(remainingSupplyBN));
    const distributedSupply = totalSupply - remainingSupply;

    response.status(200).send(
        {
            totalSupply,
            remainingSupply,
            distributedSupply
        }
    )
}


module.exports = { gasFund, getBalance, getSupply };
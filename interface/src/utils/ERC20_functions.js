const ethers = require('ethers');
const erc20 = require('../constants/casama_erc20.json');

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const ALCHEMY_PROVIDER = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_API_KEY);

export async function getERC20BalanceForWallet(tokenContractAddress, walletAddress) {
    const tokenContract = new ethers.Contract(tokenContractAddress, erc20.abi, ALCHEMY_PROVIDER);
    const balance = await tokenContract.balanceOf(walletAddress);
    return ethers.utils.formatEther(balance);
}


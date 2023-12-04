const ethers = require('ethers');
const uuid = require('uuid');


let wallets = [
    {
        name: "Zeno Quirina",
        email: "Zeno.Quirina@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Wangi Roy",
        email: "Wangi.Roy@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Judah Louisa",
        email: "Judah.Louisa@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Gwendolen Augusta",
        email: "Gwendolen.Augusta@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Colleen Zimmerman",
        email: "Colleen.Zimmerman@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Arthur Fowler",
        email: "Arthur.Fowler@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Francisco Tran",
        email: "Francisco.Tran@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Paulo Garza",
        email: "Paulo.Garza@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Olga Osborne",
        email: "Olga.Osborne@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
    {
        name: "Caroline Price",
        email: "Caroline.Price@gmail.com",
        tokenHoldings: 0,
        cashHoldings: 0,
    },
];
for(var i = 0; i < wallets.length; i++) {
    wallets[i].address = ethers.Wallet.createRandom().address;
}

console.log(wallets);
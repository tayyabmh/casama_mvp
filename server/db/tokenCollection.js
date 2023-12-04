const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const mongo_uri = "mongodb+srv://tayyabh:" + process.env.MONGO_DB_PASS + "@casama.4x0kx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function saveTokenConfig(user, tokenName, tokenSymbol, tokenContractAddress, txn_hash) {
    try {
        await client.connect();

        const database = client.db("casama");
        const tokens = database.collection("tokens");
        const query = {
            user: user,
            tokenName: tokenName,
            tokenSymbol: tokenSymbol,
            tokenContractAddress: tokenContractAddress,
            transactionHash: txn_hash
        }
        const insertion = await tokens.insertOne(query)
        return insertion;
    } finally {
        await client.close();
    }
}

async function getTokenConfig (user) {
    try {
        await client.connect();
        
        const database =  client.db("casama");
        const tokens = database.collection("tokens");
        const tokenConfig = await tokens.findOne({user: user});
        return tokenConfig;
    }
    finally {
        await client.close();
    }
}

module.exports = { saveTokenConfig, getTokenConfig }
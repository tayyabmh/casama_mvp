const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const mongo_uri = "mongodb+srv://tayyabh:" + process.env.MONGO_DB_PASS + "@casama.4x0kx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
})

async function insertNewWalletToDatabase(newWallet) {
    try {
        await client.connect();

        const database = client.db("casama");
        const wallets = database.collection("wallets");
        
        const insertion_result = await wallets.updateOne(
            { 
                user_id: newWallet.user_id, 
                wallet_id: newWallet.wallet_id 
            },
            { 
                $setOnInsert: {
                    user_id: newWallet.user_id,
                    wallet_user_id: newWallet.wallet_id,
                    wallet_metadata: newWallet.wallet_metadata,
                    wallet: newWallet.wallet
                }
            },
            { upsert: true }
        );

        if (insertion_result.upsertedCount === 0) {
            return {
                message: "Wallet already exists."
            }
        } else {
            const wallet = await wallets.findOne({ user_id: newWallet.user_id, wallet_id: newWallet.wallet_id });
            return {
                message: "Wallet created successfully.",
                wallet: {
                    address: wallet.wallet.address,
                    wallet_metadata: wallet.wallet_metadata,
                    wallet_user_id: wallet.wallet_user_id,
                }
            }
        }
        
    } finally {
        await client.close();
    }
    
}

async function getAllWallets(user) {
    try {
        await client.connect();

        const database = client.db("casama");
        const wallets = database.collection("wallets");
        const query = { user_id: user  };
        const cursor = wallets.find(query);
        if ((await cursor.countDocuments) === 0) {
            return {
                message: "No wallets found."
            }
        }
        let walletsArray = [];
        await cursor.forEach(wallet => walletsArray.push({
            address: wallet.wallet.address,
            wallet_metadata: wallet.wallet_metadata,
            wallet_user_id: wallet.wallet_user_id,
        }));
        return walletsArray;
    } finally {
        await client.close();
    }
}

async function getWalletById(user, wallet_id) {
    try {
        await client.connect();

        const database = client.db("casama");
        const wallets = database.collection("wallets");
        // In this case the User ID is the ID of our User, and wallet ID is the ID of the User for the customer
        const query = {
            user_id: user,
            wallet_user_id: wallet_id 
        }
        const wallet = await wallets.findOne(query);

        if (wallet === null) {
            return {
                message: "Wallet not found."
            }
        } else {
            return {
                message: "Wallet found.",
                wallet: {
                    address: wallet.wallet.address,
                    wallet_metadata: wallet.wallet_metadata,
                    wallet_user_id: wallet.wallet_user_id,
                }
            }
        }
    } finally {
        await client.close();
    }
}

async function saveWalletConfig(user, wallet) {
    try {
        await client.connect();
        const database = client.db("casama");
        const wallets = database.collection("wallets");
        const query = {
            user: user,
            wallet: wallet
        }
        const insertion = await wallets.insertOne(query);
        return insertion;
    } finally {
        await client.close();
    }
}

async function getWalletConfig(user) {
    try {
        await client.connect();
        const database = client.db("casama");
        const wallets = database.collection("wallets");
        const query = {
            user: user
        }
        const wallet = await wallets.findOne(query);
        return wallet;
    } finally {
        await client.close();
    }
}



module.exports = { insertNewWalletToDatabase, getAllWallets, getWalletById, saveWalletConfig, getWalletConfig }
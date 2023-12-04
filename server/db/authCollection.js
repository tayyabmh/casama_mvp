const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const mongo_uri = "mongodb+srv://tayyabh:" + process.env.MONGO_DB_PASS + "@casama.4x0kx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
})


async function getOrgCredentials(user) {
    try {
        await client.connect();

        const database = client.db('casama');
        const credentials = database.collection("credentials");
        const query = {user_id: user};
        const org_credentials = await credentials.findOne(query);
        
        return org_credentials;
    } finally {
        await client.close();
    }
}


async function saveOrgCredentials(newCredentials) {
    try {
        await client.connect();

        const database = client.db('casama');
        const credentials = database.collection('credentials');
        const insertion = await credentials.insertOne(newCredentials);
        return insertion;
    } finally {
        await client.close();
    }
}

async function saveClientCredentialsForUser(user, client_id, client_secret) {
    try {
        await client.connect();

        const database = client.db('casama');
        const credentials = database.collection('credentials');
        const insertion = await credentials.insertOne({
            user_id: user,
            client_id: client_id,
            client_secret: client_secret
        });
        return insertion;
    } finally {
        await client.close();
    }
}


module.exports = { getOrgCredentials, saveOrgCredentials, saveClientCredentialsForUser };
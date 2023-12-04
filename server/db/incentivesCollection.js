const { MongoClient, ServerApiVersion } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const mongo_uri = "mongodb+srv://tayyabh:" + process.env.MONGO_DB_PASS + "@casama.4x0kx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function insertIncentive(user, incentive) {
    try {
        await client.connect();
        incentiveId = uuidv4();
        const database = client.db("casama");
        const incentives = database.collection("incentives");
        const query = {
            user: user,
            incentiveId: incentiveId,
            incentive: incentive
        }
        await incentives.insertOne(query)
        return incentiveId;
    } finally {
        await client.close();
    }
}

async function getAllIncentives(user) {
    try {
        await client.connect();
        const database = client.db("casama");
        const incentives = database.collection("incentives");
        const query = {
            user: user
        }
        const result = await incentives.find(query).toArray();
        return result;
    } finally {
        await client.close();
    }
}

module.exports = { insertIncentive, getAllIncentives }
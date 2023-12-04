const util = require('../util/utils')
const incentivesCollection = require('../db/incentivesCollection');


async function createIncentive(request, response) {
    let user = util.getUserIfClientRequest(request.auth.payload);
    const incentive = request.body;
    
    // Do some Validation
    if (!incentive.name) {
        response.status(400).send({
            "message": "Invalid incentive name"
        });
        return;
    }
    if (!incentive.description) {
        response.status(400).send({
            "message": "Invalid incentive description"
        });
        return;
    }
    if (!incentive.incentiveValue) {
        response.status(400).send({
            "message": "Invalid incentive value"
        });
        return;
    }

    // Creating the max limit object, to match the future spec
    if (incentive.max_limit && incentive.max_limit < 0) {
        incentive.limit_body = {
            "type": "permanent",
            "max_limit": incentive.max_limit
        }
    }

    // Insert the incentive into the database
    const incentiveId = await incentivesCollection.insertIncentive(user, incentive);

    response.status(200).send({incentiveId: incentiveId});
}

async function getAllIncentives(request, response) {
    let user = util.getUserIfClientRequest(request.auth.payload);
    const incentives = await incentivesCollection.getAllIncentives(user);
    // Remove _id and user from result
    const cleanedIncentives = incentives.map(incentive => {
        return {
            "incentiveId": incentive.incentiveId,
            incentive: incentive.incentive,
        }
    })

    response.status(200).send(cleanedIncentives);
}

module.exports = { createIncentive, getAllIncentives }
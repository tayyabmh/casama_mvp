const axios = require('axios');



async function trackDistributionCalls(user) {
    return axios.post('https://app.pendo.io/data/track', {
        "type": "track",
        "event": "distribution_call",
        "visitorId": user,
        "timestamp": Date.now()
    }, {
        headers: {
            'Content-Type': 'application/json',
            'x-pendo-integration-key': process.env.PENDO_INTEGRATION_KEY,
        }
    })
}

    module.exports = { trackDistributionCalls }
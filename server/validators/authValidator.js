function validateGetCredentials(org_id) {
    if (org_id === '') {
        throw "No org_id was provided"
    }


    return true;
}


function validateSaveCredentials(app_id, app_secret, org_id) {
    if (app_id === '') {
        throw "No app_id was provided";
    } else if (app_secret === '') {
        throw "No app_secret was provided";
    } else if (org_id === '') {
        throw "No org_id was provided";
    }

    return true;
}

module.exports = {validateGetCredentials, validateSaveCredentials}
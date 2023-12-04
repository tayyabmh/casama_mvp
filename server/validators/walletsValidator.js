function checkWalletCreationInput(name, email) {
    if(name === '') {
        throw "Please enter the person's name associated with this wallet."
    } else if (email === '') {
        throw "Please enter the person's email associated with this wallet."
    }
    return true;
}

module.exports = { checkWalletCreationInput }
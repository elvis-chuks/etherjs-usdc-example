const ethers = require('ethers');

const provider = ethers.getDefaultProvider('ropsten', {
    infura: 'https://ropsten.infura.io/v3/bd6e815b3b66406897d91304c27b6e76'
});

module.exports = provider;
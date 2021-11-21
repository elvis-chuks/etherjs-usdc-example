const ethers = require('ethers');

const mnemonic = 'possible source super clog immune inch twin crack debate lumber demise sketch';
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);

module.exports = wallet;
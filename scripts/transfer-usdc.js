const ethers = require('ethers');
const wallet = require('./utils/wallet.js');
const provider = require('./utils/provider.js');
const {address, adi, abi} = require('./utils/config.js');

async function main(args) {
    const account = wallet.connect(provider);

    const usdc = new ethers.Contract(
        address, 
        abi,
        account
    );

    let to, value;

    try {
        to = ethers.utils.getAddress(args[0]);

        value = ethers.utils.parseUnits(args[1], 6)
        if(value.isNegative()) {
            throw new Error('cannot transfer negative value');
        }
    } catch(err) {
        console.error(err)
        process.exit(1);
    }

    const balance = await usdc.balanceOf(account.address);

    if(balance.lt(value)) {
        const valueFormatted = ethers.utils.formatUnits(value, 6);
        const balanceFormatted = ethers.utils.formatUnits(balance, 6);
        console.error(`Insufficient balance to send ${valueFormatted}, you have ${balanceFormatted}`);
        process.exit(1);
    }

    const tx = await usdc.transfer(to, value, { gasPrice: 20e9});
    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`Transaction Confirmed in block number ${receipt.blockNumber}`)
    console.log(`Gas used: ${receipt.gasUsed.toString()}`)
}

main(process.argv.slice(2));
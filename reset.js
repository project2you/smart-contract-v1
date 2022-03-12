const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: 'http://127.0.0.1:8545',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
  privateKey: '0x5126c83f4c1987c8632b6433ebc3acc8df632961a39cb26cd11fce61406c8344',
};
const contractAddress = '0x6AFE8b67c4B084c7fD6DB2fF01D7347c323304c5';

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Reset Tx
const resetTx = incrementer.methods.reset();

const reset = async () => {
  console.log(`Calling the reset function in contract at address: ${contractAddress}`);

  // Sign Tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: resetTx.encodeABI(),
      gas: await resetTx.estimateGas(),
    },
    account_from.privateKey
  );

  // Send Tx and Wait for Receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

reset();

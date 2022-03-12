const Web3 = require('web3');
const contractFile = require('./compile');

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
  address: '0x1F3c033aDaD28E8493EC0FD3972848cA5eD6E331',
};
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
  console.log(`Attempting to deploy from account ${account_from.address}`);

  // Create Contract Instance
  const incrementer = new web3.eth.Contract(abi);

  // Create Constructor Tx
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [5],
  });

  // Sign Transacation and Send
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: incrementerTx.encodeABI(),
      gas: await incrementerTx.estimateGas(),
    },
    account_from.privateKey
  );

  // Send Tx and Wait for Receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

deploy();

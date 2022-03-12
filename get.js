const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: 'http://localhost:8545',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const contractAddress = '0x6AFE8b67c4B084c7fD6DB2fF01D7347c323304c5';

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  // Call Contract
  const data = await incrementer.methods.number().call();

  console.log(`The current number stored is: ${data}`);
};

get();

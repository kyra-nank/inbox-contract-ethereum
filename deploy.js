// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  process.env.MNENOMIC,
  'https://rinkeby.infura.io/v3/e09db2619fe4451f809117607579c588'
);

const web3 = new web3(provider);

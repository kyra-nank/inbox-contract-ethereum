const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

require("dotenv").config()

const MNEMONIC = process.env.MNEMONIC;

// unlock accounts with mnemonic and connect to infura node
const provider = new HDWalletProvider(MNEMONIC,'https://rinkeby.infura.io/v3/e09db2619fe4451f809117607579c588');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempt to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Initial message from deploy.js'] })
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
};

deploy();

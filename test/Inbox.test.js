const assert = require('assert');         // make assertions about tests
const ganache = require('ganache-cli');   // local ethereum test network
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());  // instance of web3 using ganache as provider
const { interface, bytecode } = require('../compile'); // importing ABI and bytecode

require("dotenv").config()

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there! This is the initialMessage'] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();  // console log inbox and you'll see
    assert.equal(message, 'Hi there! This is the initialMessage');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('new message').send({ from: accounts[0] })    // sending transaction to network
    const message = await inbox.methods.message().call();
    assert.equal(message,'new message')
  });



})

























// // write class to test
// class Car {
//   park() {
//     return 'stopped';
//   }
//   drive() {
//     return 'vroom';
//   }
// }
//
// let car;
// beforeEach(() => {
//   car = new Car();
// });
//
// // use Mocha to assert that calling park and drive return 'stopped' and 'vroom' respectively
// describe('Car Class Test', () => {
//   it('Park Method Test', () => {
//     // test setup and assertion logic
//     assert.equal(car.park(), 'stopped');   // .equal(value produced by code, value it should be)
//   });
//   it('Drive Method Test', () => {
//     assert.equal(car.drive(), 'vroom');
//   })
// });

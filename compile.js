// require('./contracts/Inbox.sol');  //can't do this, it'll think it's JS

const path = require('path');   // help build path from compile.js to Inbox.sol
const fs = require('fs');
const solc = require('solc');   // solidity compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // generates path that'll work on UNIX and Windows
const source = fs.readFileSync(inboxPath, 'utf8');                    // read in contents of source code file

module.exports = solc.compile(source, 1).contracts[':Inbox'];     // how many contracts trying to read = 1

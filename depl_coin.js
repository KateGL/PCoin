Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.accounts;
var fs = require('fs');
code = fs.readFileSync('PCoin.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);
abiDefinition = JSON.parse(compiledCode.contracts[':PCoin'].interface);
CoinContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':PCoin'].bytecode;
//create CoinContract with 300 coins on owner (bank) balance
deployedContract = CoinContract.new(web3.eth.accounts[1], web3.eth.accounts[2],300,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
deployedContract.address;
contractInstance = CoinContract.at(deployedContract.address);

//test-cases

//test function
contractInstance.foo.call();

//owner (bank) create 3 coins
contractInstance.make_coin(web3.eth.accounts[0], 3,{from: web3.eth.accounts[0]});
//check client balance
contractInstance.queryBalance(web3.eth.accounts[1]);
//send 20 coins from bank to client
contractInstance.send(web3.eth.accounts[1], 20,{from: web3.eth.accounts[0]});
//send 5 coins from  client to allowed supplyer (Ok)
contractInstance.send(web3.eth.accounts[2], 5,{from: web3.eth.accounts[1]});
//send 5 coins from  client to not allowed supplyer  (Fail)
contractInstance.send(web3.eth.accounts[3], 5,{from: web3.eth.accounts[1]});
//bank burn 5 coins
contractInstance.burn_coin(5);
contractInstance.balances(web3.eth.accounts[0]);



web3.eth.accounts;
//owner  web3.eth.accounts[0]

//client web3.eth.accounts[1]
//supply1 web3.eth.accounts[2]
//supply2 web3.eth.accounts[3]


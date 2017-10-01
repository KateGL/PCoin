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
deployedContract = CoinContract.new(web3.eth.accounts[1], web3.eth.accounts[2],300,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
deployedContract.address;
contractInstance = CoinContract.at(deployedContract.address);

contractInstance.foo.call();

contractInstance.getCoinData.call();
contractInstance.getCoinData2.call();
contractInstance.make_coin(web3.eth.accounts[0], 3,{from: web3.eth.accounts[0]});

contractInstance.balances(web3.eth.accounts[1], {from: web3.eth.accounts[0]});
contractInstance.balances().call(web3.eth.accounts[1]);

contractInstance.queryBalance(web3.eth.accounts[1]);

contractInstance.send(web3.eth.accounts[1], 20,{from: web3.eth.accounts[0]});
contractInstance.send(web3.eth.accounts[2], 5,{from: web3.eth.accounts[1]});

contractInstance.send(web3.eth.accounts[3], 5,{from: web3.eth.accounts[1]});

contractInstance.return_coin(5);

contractInstance.balances(web3.eth.accounts[0]);



web3.eth.accounts;
[ '0x9cf554521e59aea145fa6df12b0d4f0494caa180', --owner  web3.eth.accounts[0]

  '0xb5bee5ffa98703dfa3926e79cf4e8d7aff4e6fa1', --client web3.eth.accounts[1]
  '0x8661d62cd5da7b93c7f4da0d93a904653b950724', --supply1 web3.eth.accounts[2]
  '0x974bfc1afbe3a44eadd67ef9360868210d508fa8', --supply2 web3.eth.accounts[3]
  '0xcdd3953c85dd795bcbc9c0e00413a23b3d964080',
  '0x4d691377f59f3fa4028c5c956c3e601cf90a9fa7',
  '0xadfcf5be5cccb206848659f70ffe3ac997496749',
  '0x9f9b28d01514488736d507c808dcbef4c82322b9',
  '0xca59c42f8816e9d4a1de5cc2cdac6ace282bd208',
  '0xcb1f398b05a202ac124edf7c59b8603a4a737e24' ]

'0x9cf554521e59aea145fa6df12b0d4f0494caa180',
  '0xb5bee5ffa98703dfa3926e79cf4e8d7aff4e6fa1',
  '0x8661d62cd5da7b93c7f4da0d93a904653b950724',
  '0x974bfc1afbe3a44eadd67ef9360868210d508fa8',
  '0xcdd3953c85dd795bcbc9c0e00413a23b3d964080',
  '0x4d691377f59f3fa4028c5c956c3e601cf90a9fa7',
  '0xadfcf5be5cccb206848659f70ffe3ac997496749',
  '0x9f9b28d01514488736d507c808dcbef4c82322b9',
  '0xca59c42f8816e9d4a1de5cc2cdac6ace282bd208',
  '0xcb1f398b05a202ac124edf7c59b8603a4a737e24' ]


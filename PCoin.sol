pragma solidity ^0.4.11;

contract PCoin {

  address[] public coinUsers;
  address owner;

  mapping (address => uint) public balances;
  mapping (uint => address) public account_indexes;

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Send(address from, address to, uint value);

  function PCoin(address client, address supply, uint amount) {
    owner = msg.sender;
    coinUsers = [owner, client, supply];
    balances[owner] = amount;

  }

  function check_users(address user) returns (bool check){
    for(uint i = 0; i < coinUsers.length; i++){
        if (user == coinUsers[i]){
            return true;
        }
    }
    return false;
  }

  function make_coin(address receiver, uint amount) returns (uint){
     if (msg.sender != owner) return;
     bool check = check_users(receiver);
     if (check == false) return;
     balances[receiver] += amount;
     return balances[receiver];
    }

  function burn_coin(uint amount){
    if (msg.sender != owner) return;
    if (balances[msg.sender] < amount) return;
    balances[msg.sender] -= amount;
  }


  function queryBalance(address addr) constant returns (uint balance) {
   return balances[addr];
   }


  function send(address receiver, uint amount) {
        if (balances[msg.sender] < amount) return;

        bool check = check_users(msg.sender);
        if (check == false) return;

        check = check_users(receiver);
        if (check == false) return;

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Send(msg.sender, receiver, amount);
    }

  function return_coin(uint amount){
     bool check = check_users(msg.sender);
     if (check == false) return;

     if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[owner] += amount;
        Transfer(msg.sender, owner, amount);
  }

  // for testing :)
  function foo(){
    return;
   }



}

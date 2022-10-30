// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
  // created variable with its type  
  uint256 transactionCount;

  // created event  
  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  // created interface   
  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }   

  // created variable with its type of interface   
  TransferStruct[] transactions;

  // function that represents the form of transaction and its variables
  // that are necessary in order to perform it 
  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
    transactionCount += 1;
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
    // up until here we're not making a transaction but just pushing a 
    // specific transaction into transactions array; to continue with it
    // and perform the actual transaction we have to emit the Transfer event
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }  

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }  

  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }   
}
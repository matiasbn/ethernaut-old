/* eslint-disable no-underscore-dangle */
const BadKing = artifacts.require('BadKing');
const King = artifacts.require('King');
const { catchRevert } = require('./exceptionsHelpers.js');


contract('BadKing', (accounts) => {
  let badKing;
  let king;
  const owner = accounts[0];
  const user = accounts[1];

  before(async () => {
    king = await King.new({
      value: web3.utils.toWei('1'),
    });
    badKing = await BadKing.new(king.address, {
      // more than 1 ether for the transaction gas
      value: web3.utils.toWei('1'),
    });
  });


  it('should change the king to BadKing address', async () => {
    const prize = web3.utils.toWei('1');
    const oldKing = await king._king();
    assert.equal(oldKing, owner, 'oldKing should be the king address');
    await badKing.dethroneKing(prize);
    const newKing = await king._king();
    assert.equal(newKing, badKing.address, 'newKing should be the badKing address');
  });

  it('should not change the king to owner address after taking the throne, muajajajaja', async () => {
    const prize = web3.utils.toWei('1');
    const oldKing = await king._king();
    assert.equal(oldKing, badKing.address, 'oldKing should be the badKing address');
    // With value
    await catchRevert(king.sendTransaction({ from: owner, value: prize }));
    // Without value
    await catchRevert(king.sendTransaction({ from: owner, value: 0 }));
    const newKing = await king._king();
    assert.equal(newKing, badKing.address, 'newKing should be the badKing address');
  });
});

const BadKing = artifacts.require('BadKing');

const address = '0x1fb863f8E39b3da64aA97e0aC40B0798d667868e';

module.exports = function (deployer) {
  deployer.deploy(BadKing, address, { value: web3.utils.toWei('1', 'ether') });
};

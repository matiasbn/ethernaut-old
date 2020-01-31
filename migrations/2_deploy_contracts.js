const ForceSol = artifacts.require('ForceSol');

const address = '0x9d84c8e81bb9a7569e554d87f3b140c92b6f20ec';

module.exports = function (deployer) {
  deployer.deploy(ForceSol, { value: web3.utils.toWei('0.0001', 'ether') });
};

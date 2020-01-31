const ReentranceSol = artifacts.require('ReentranceSol');

const address = '0x2F493EEa60Dcec0521157C08a9298fcA1C3DC350';
const steal = web3.utils.toWei('0.5');

module.exports = function (deployer) {
  deployer.deploy(ReentranceSol, address, steal);
};

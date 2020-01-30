const Migrations = artifacts.require('Migrations');
const CoinFlipSol = artifacts.require('CoinFlipSol');

const flipCoinAddress = '0x8a90c284dcf34f61f79279a3f442fd9b9c2a875e';

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CoinFlipSol, flipCoinAddress);
};

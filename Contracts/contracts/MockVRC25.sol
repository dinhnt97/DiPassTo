// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./libraries/VRC25.sol";

contract MockVRC25 is VRC25 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 lockTime
    ) {
        _VRC25_Init(name, symbol, decimals, lockTime);
        _mint(msg.sender, 10 ** 28);
    }

    function _estimateFee(
        uint256 value
    ) internal view virtual override returns (uint256) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

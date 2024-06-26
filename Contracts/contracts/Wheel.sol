// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Pool.sol";

contract Wheel is Ownable {
    IERC20 public token;
    address[] public pools;

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    function createPool(
        uint256 amount,
        uint256 ticketPriceRate,
        uint256 startTime,
        uint256 endTime,
        uint256[] memory rewardRates,
        uint256[] memory rewardValuePercents
    ) public {
        Pool pool = new Pool(
            amount,
            ticketPriceRate,
            startTime,
            endTime,
            rewardRates,
            rewardValuePercents,
            token,
            msg.sender
        );

        token.transferFrom(msg.sender, address(pool), amount);

        pools.push(address(pool));
    }
}

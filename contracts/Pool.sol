// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pool {
    uint256 public ticketPrice; // ticket price
    uint256 public maxPool; // total pool amount value

    uint256 public poolAmount; // current pool amount value

    uint256 public totalRolls; // total rolls
    uint256 public count; // number of rolls

    uint256 public startTime; // timeout of rolling event
    uint256 public endTime; // timeout of rolling event

    uint256 public rolledTickets; // number of rolled tickets

    mapping(uint256 => bool) public ticketActive; // tickets

    mapping(address => uint256) public userTickets; // user tickets

    mapping(uint256 => Reward) public rewards; // rewards

    address public initUser; // user who initialized the pool

    bool public isInitialized; // is pool initialized

    IERC20 public token;

    struct Reward {
        uint256 rewardRate;
        uint256 rewardValuePercent;
    }

    constructor(
        uint256 _ticketPrice,
        uint256 _maxPool,
        uint256 _startTime,
        uint256 _endTime,
        uint256[] memory rewardRates,
        uint256[] memory rewardValuePercents,
        IERC20 _token
    ) {
        ticketPrice = _ticketPrice;
        maxPool = _maxPool;
        count = 0;
        startTime = _startTime;
        endTime = _endTime;
        token = _token;
        isInitialized = false;

        require(
            rewardRates.length == rewardValuePercents.length,
            "Invalid data"
        );

        for (uint256 i = 0; i < rewardRates.length; i++) {
            rewards[i] = Reward(rewardRates[i], rewardValuePercents[i]);
        }

        totalRolls = maxPool / ticketPrice;
    }

    function initPool(uint256 amount) public {
        require(block.timestamp <= endTime, "Pool is finished");
        require(!isInitialized, "Pool is already initialized");
        // amount not greater than 15% of maxPool
        require(amount <= (maxPool * 15) / 100, "Amount is too big");

        token.transferFrom(msg.sender, address(this), amount);

        initUser = msg.sender;
        poolAmount = amount;
        isInitialized = true;
    }

    function claim() public {
        require(block.timestamp >= endTime, "Claiming is not started yet");
        require(msg.sender == initUser, "You are not the pool initializer");

        token.transfer(msg.sender, poolAmount);
    }

    function register() public {
        require(
            block.timestamp >= startTime,
            "Registration is not started yet"
        );
        require(block.timestamp <= endTime, "Registration is finished");
        require(count < totalRolls, "Pool is full");

        token.transferFrom(msg.sender, address(this), ticketPrice);

        ticketActive[count] = false;
        userTickets[msg.sender] = count;

        count++;
    }

    function roll(uint256 ticketId) public {
        require(block.timestamp >= endTime, "Rolling is not started yet");
        require(count == totalRolls, "Pool is not full");

        require(ticketActive[ticketId] == false, "Ticket is already rolled");
        require(userTickets[msg.sender] == ticketId, "You don't have a ticket");

        ticketActive[ticketId] = true;
        rolledTickets++;
    }
}

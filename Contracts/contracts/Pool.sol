// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pool {
    uint256 public ticketPrice; // ticket price
    uint256 public ticketPriceRate; // ticket price step percent = Amount init / ticket price

    uint256 public maxPool; // total pool amount value

    uint256 public poolAmount; // current pool amount value

    uint256 public count; // number of rolls

    uint256 public startTime; // timeout of rolling event
    uint256 public endTime; // timeout of rolling event

    uint256 public rolledTickets; // number of rolled tickets

    mapping(uint256 => bool) public ticketActive; // tickets
    mapping(address => uint256) public userTickets; // user tickets
    mapping(uint256 => Reward) public rewards; // rewards

    address public initUser; // user who initialized the pool

    bool public isInitialized; // is pool initialized

    uint256 public luckyRate = 0;

    IERC20 public token;

    struct Reward {
        uint256 rewardRate;
        uint256 rewardValuePercent;
    }

    constructor(
        uint256 _amount,
        uint256 _ticketPriceRate,
        uint256 _startTime,
        uint256 _endTime,
        uint256[] memory rewardRates,
        uint256[] memory rewardValuePercents,
        IERC20 _token,
        address _initUser
    ) {
        poolAmount = _amount;

        ticketPriceRate = _ticketPriceRate;
        ticketPrice = (_amount * _ticketPriceRate) / 100;

        count = 0;

        startTime = _startTime;
        endTime = _endTime;

        token = _token;
        initUser = _initUser;

        require(
            rewardRates.length == rewardValuePercents.length,
            "Invalid data"
        );

        for (uint256 i = 0; i < rewardRates.length; i++) {
            rewards[i] = Reward(rewardRates[i], rewardValuePercents[i]);
        }
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

        calculateTicketPrice();

        token.transferFrom(msg.sender, address(this), ticketPrice);

        ticketActive[count] = false;
        userTickets[msg.sender] = count;

        count++;
    }

    function roll(uint256 ticketId) public {
        require(block.timestamp >= endTime, "Rolling is not started yet");

        require(ticketActive[ticketId] == false, "Ticket is already rolled");
        require(userTickets[msg.sender] == ticketId, "You don't have a ticket");

        calculateLuckyRate();

        uint256 randomNumber = uint(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, block.number)
            )
        ) % (100000 - 1);

        require(randomNumber <= luckyRate, "You are not lucky");

        // Random

        ticketActive[ticketId] = true;
        rolledTickets++;
    }

    function calculateLuckyRate() public {
        luckyRate = 1000 - (1000 - 5) ** count; // Lucky rate * 1000
    }

    function calculateTicketPrice() public {
        ticketPrice = (poolAmount * ticketPriceRate) / 100;
    }
}

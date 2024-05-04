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
    mapping(address => uint256[]) public userTickets; // user tickets

    // mapping(uint256 => Reward) public rewards; // rewards
    uint256[] rewardRates;
    uint256[] rewardValuePercents;

    address public initUser; // user who initialized the pool

    bool public isInitialized; // is pool initialized

    uint256 public luckyRate = 0;

    IERC20 public token;

    uint256 public constant INFINITY = 100;

    event Register(address indexed user, uint256 ticketId);
    event Roll(address indexed user, uint256 ticketId, uint256 rewardId);

    struct Reward {
        uint256 rewardRate;
        uint256 rewardValuePercent;
    }

    constructor(
        uint256 _amount,
        uint256 _ticketPriceRate,
        uint256 _startTime,
        uint256 _endTime,
        uint256[] memory _rewardRates,
        uint256[] memory _rewardValuePercents,
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
            rewardRates.push(_rewardRates[i]);
            rewardValuePercents.push(_rewardValuePercents[i]);
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

        ticketPrice = (poolAmount * ticketPriceRate) / 100;

        token.transferFrom(msg.sender, address(this), ticketPrice);

        ticketActive[count] = false;

        userTickets[msg.sender].push(count);

        poolAmount = poolAmount + ticketPrice;

        count++;

        emit Register(msg.sender, count);
    }

    function roll(uint256 ticketId) public returns (uint256) {
        require(ticketActive[ticketId] == false, "Ticket is already rolled");
        require(
            ticketIsExist(ticketId, address(msg.sender)),
            "You don't have a ticket"
        );

        unchecked {
            rolledTickets = rolledTickets + 1;
            luckyRate = 1000 - (1000 - 100) ** rolledTickets;

            uint256 randomNumber = uint(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, block.number)
                )
            ) % (100000 - 1);

            if (randomNumber > luckyRate) {
                ticketActive[ticketId] = true;
                emit Roll(msg.sender, ticketId, INFINITY);
                return INFINITY;
            }

            // Random

            uint256 rewardRandom = uint(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, block.number)
                )
            ) % (10000 - 1);

            uint256 i = 0;
            while (i < rewardRates.length) {
                if (rewardRandom <= rewardRates[i] * 100) {
                    uint256 rewardValue = (poolAmount *
                        rewardValuePercents[i]) / 100;

                    // Transfer 95% of reward to user
                    token.transfer(msg.sender, (rewardValue * 95) / 100);

                    // Transfer 5% of reward to initUser
                    token.transfer(initUser, (rewardValue * 5) / 100);
                    break;
                }
                i++;
            }

            ticketActive[ticketId] = true;
            emit Roll(msg.sender, ticketId, i);
            return i;
        }
    }

    function calculateLuckyRate() public {
        rolledTickets = rolledTickets + 1;
        luckyRate = 1000 - (1000 - 5) ** rolledTickets; // Lucky rate * 1000
    }

    function calculateTicketPrice() public {
        ticketPrice = (poolAmount * ticketPriceRate) / 100;
    }

    function ticketIsExist(
        uint256 ticketId,
        address addr
    ) public view returns (bool) {
        for (uint256 i = 0; i < userTickets[addr].length; i++) {
            if (userTickets[addr][i] == ticketId) {
                return true;
            }
        }
        return false;
    }

    // GETTERS

    function getUserTickets(
        address addr
    ) public view returns (uint256[] memory) {
        return userTickets[addr];
    }
}

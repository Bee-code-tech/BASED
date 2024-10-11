// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentToken is ERC20, Ownable {

    constructor(address owner) ERC20("PaymentToken", "PKN") Ownable(owner) {}

    function mint (address recipient, uint256 amount) external {
        _mint(recipient, amount);
    }

    function transfer(address from, address to, uint256 value)external returns (bool) {
        _transfer(from, to, value);
        return true;
    }
}
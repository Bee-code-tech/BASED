// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    
    function mint (address recipient, uint256 amount) external;

    function transfer(address from, address to, uint256 value)external returns (bool);

    function balanceOf(address account) external  view returns (uint256);
}
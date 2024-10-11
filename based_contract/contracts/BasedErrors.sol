// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BasedErrors {

    error NOT_ALLOWED(address zero);
    error INSUFFICIENT(uint256 amount);
    error REGISTRATION_FAILED();
    error USER_DOES_NOT_EXIST(address userAddress);
    error CANNOT_UPDATE_USERNAME_YET(uint256 changeTime);
    error COMMUNITY_NOT_FOUND(bytes32);
    error NOT_A_USER(address);
    error ALREADY_A_MEMBER(address);
    error NOT_A_MEMBER(address);
    error POST_NOT_FOUND(bytes32);
    error ALREADY_FOLLOWING(address);
}
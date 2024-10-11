// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BasedErrors {

    error NOT_ALLOWED(address _zero);
    error INSUFFICIENT(uint256 _amount);
    error REGISTRATION_FAILED();
    error USER_DOES_NOT_EXIST(address _user);
    error CANNOT_UPDATE_USERNAME_YET(uint256 _changeTime);
    error COMMUNITY_NOT_FOUND(bytes32 _communityId);
    error NOT_A_USER(address _user);
    error ALREADY_A_MEMBER(address _member);
    error NOT_A_MEMBER(address _user);
    error POST_NOT_FOUND(bytes32 _postId);
    error ALREADY_FOLLOWING(address _user);
}
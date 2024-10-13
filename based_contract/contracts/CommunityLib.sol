// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "contracts/BasedErrors.sol";

library CommunityLib {

    struct Community {
        address creator;
        bytes32 communityId;
        string communityName;
        string description;
        uint256 noOfMembers;
        address[] members;
        uint256 createdAt;
    }

    struct Member {
        address member;
        bool isMember;
        uint256 joinedAt;
    }

    event CommunityCreated(bytes32 indexed _commId, string indexed _communityName);
    event MemberJoined(address indexed member, bytes32 communityId);
    event MemberRemoved(address indexed _member, bytes32 indexed _commId);
    event MemberAdded(address indexed _member, bytes32 indexed _commId);
    event MemberLeft(address indexed _member, bytes32 indexed _commId);


    function _createCommunity(
        mapping(bytes32 => Community) storage communities, 
        address _creator, 
        string memory _communityName, 
        string memory _description
        ) internal {

            bytes32 _commId = keccak256(abi.encode(_creator, _communityName, _description));

        Community storage _community = communities[_commId];

        _community.creator = _creator;
        _community.communityId = _commId;
        _community.communityName = _communityName;
        _community.description = _description;
        _community.createdAt = block.timestamp;

        emit CommunityCreated(_commId, _communityName);
    }
    
    function _getCommunity(
        mapping(bytes32 => Community) storage communities, 
        bytes32 _commId
    ) public view returns (Community memory) {
        return communities[_commId];
    }

    function _joinCommunity(
        mapping(bytes32 => Community) storage communities, 
        mapping (bytes32 => mapping (address => Member)) storage members,
        mapping (address => mapping (bytes32 => Community)) storage myCommunities,
        address _caller, 
        bytes32 _commId) public {

        if (members[_commId][_caller].isMember) 
            revert BasedErrors.ALREADY_A_MEMBER(_caller);

        Member storage _newMember = members[_commId][_caller];
        _newMember.member = _caller;
        _newMember.isMember = true;
        _newMember.joinedAt = block.timestamp;
    
        Community storage _community = communities[_commId]; 
        _community.noOfMembers = _community.noOfMembers + 1;
        _community.members.push(_caller);

        myCommunities[_caller][_commId] = _community;

        emit MemberJoined(_caller, _commId);
    }  

    function _getCommunityMember(
        mapping(bytes32 => mapping(address => Member)) storage members,
        bytes32 _commId, 
        address _user
        ) public view returns (Member memory) {

            Member memory _member = members[_commId][_user];
            if (!_member.isMember) revert BasedErrors.NOT_A_MEMBER(_user);

            return _member;
        
    }

    function _removeMember(
        mapping(bytes32 => Community) storage communities, 
        mapping (bytes32 => mapping (address => Member)) storage members,
        mapping (address => mapping (bytes32 => Community)) storage myCommunities,
        address _caller, 
        address _member, 
        bytes32 _commId
        ) public {

        if (communities[_commId].creator != _caller) 
            revert BasedErrors.NOT_ALLOWED(_caller);
        
        Member storage _communityMember = members[_commId][_member];
        if (!_communityMember.isMember) revert BasedErrors.NOT_A_MEMBER(_member);

        _communityMember.isMember = false;

        Community storage _community = communities[_commId];
        _community.noOfMembers = _community.noOfMembers - 1;

        delete myCommunities[_member][_commId];

        emit MemberRemoved(_member, _commId);
    }

      function _addMember(
        mapping(bytes32 => Community) storage communities, 
        mapping (bytes32 => mapping (address => Member)) storage members,
        mapping (address => mapping (bytes32 => Community)) storage myCommunities,
        address _caller,
        address _member, 
        bytes32 _commId
        ) public {

        if (communities[_commId].creator != _caller) 
            revert BasedErrors.NOT_ALLOWED(_caller);
        
        Member storage _communityMember = members[_commId][_member];
        if (_communityMember.isMember) revert BasedErrors.ALREADY_A_MEMBER(_member);

        _communityMember.isMember = true;

        Community storage _community = communities[_commId];
        _community.noOfMembers = _community.noOfMembers + 1;

        myCommunities[_member][_commId] = _community;

        emit MemberAdded(_member, _commId);
    }

    function _memberLeaves(
        mapping(bytes32 => Community) storage communities, 
        mapping (bytes32 => mapping (address => Member)) storage members,
        mapping (address => mapping (bytes32 => Community)) storage myCommunities,
        bytes32 _commId, 
        address _member
        ) public {

        if (!members[_commId][_member].isMember) revert BasedErrors.NOT_A_MEMBER(_member);

        delete members[_commId][_member];

        delete myCommunities[_member][_commId];


        Community storage _community = communities[_commId];
        _community.noOfMembers = _community.noOfMembers + 1;

        emit MemberLeft(_member, _commId);
    }   
}

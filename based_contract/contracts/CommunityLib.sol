// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BasedErrors.sol";
import "./IBased.sol";

library CommunityLib {

    event CommunityCreated(bytes32 indexed _commId, string indexed _communityName);
    event MemberJoined(address indexed member, bytes32 communityId);
    event MemberRemoved(address indexed _member, bytes32 indexed _commId);
    event MemberAdded(address indexed _member, bytes32 indexed _commId);
    event MemberLeft(address indexed _member, bytes32 indexed _commId);


    function _createCommunity(
        mapping(bytes32 => IBased.Community) storage communities, 
        IBased.Community[] storage allCommunities,
        address _creator, 
        string memory _communityName, 
        string memory _description
        ) public {

            bytes32 _commId = keccak256(abi.encode(_creator, _communityName, _description));

        IBased.Community storage _community = communities[_commId];

        _community.creator = _creator;
        _community.communityId = _commId;
        _community.communityName = _communityName;
        _community.description = _description;
        _community.createdAt = block.timestamp;

        allCommunities.push(_community);

        emit CommunityCreated(_commId, _communityName);
    }

    function _getAllCommunities(IBased.Community[] storage allCommunities) public pure returns (IBased.Community[] memory) {     
       return allCommunities;
    }
    
    function _getCommunity(
        mapping(bytes32 => IBased.Community) storage communities, 
        bytes32 _commId
    ) public view returns (IBased.Community memory) {
        return communities[_commId];
    }

    function _joinCommunity(
        mapping(bytes32 => IBased.Community) storage communities, 
        mapping (bytes32 => mapping (address => IBased.Member)) storage members,
        mapping (address => mapping (bytes32 => IBased.Community)) storage myCommunities,
        address _caller, 
        bytes32 _commId) public {

        if (members[_commId][_caller].isMember) 
            revert BasedErrors.ALREADY_A_MEMBER(_caller);

        IBased.Member storage _newMember = members[_commId][_caller];
        _newMember.member = _caller;
        _newMember.isMember = true;
        _newMember.joinedAt = block.timestamp;
    
        IBased.Community storage _community = communities[_commId]; 
        _community.noOfMembers = _community.noOfMembers + 1;
        _community.members.push(_caller);

        myCommunities[_caller][_commId] = _community;

        emit MemberJoined(_caller, _commId);
    }  

    function _getCommunityMember(
        mapping(bytes32 => mapping(address => IBased.Member)) storage members,
        bytes32 _commId, 
        address _user
        ) public view returns (IBased.Member memory) {

            IBased.Member memory _member = members[_commId][_user];
            if (!_member.isMember) revert BasedErrors.NOT_A_MEMBER(_user);

            return _member;
        
    }

    function _removeMember(
        mapping(bytes32 => IBased.Community) storage communities, 
        mapping (bytes32 => mapping (address => IBased.Member)) storage members,
        mapping (address => mapping (bytes32 => IBased.Community)) storage myCommunities,
        address _caller, 
        address _member, 
        bytes32 _commId
        ) public {

        if (communities[_commId].creator != _caller) 
            revert BasedErrors.NOT_ALLOWED(_caller);
        
        IBased.Member storage _communityMember = members[_commId][_member];
        if (!_communityMember.isMember) revert BasedErrors.NOT_A_MEMBER(_member);

        _communityMember.isMember = false;

        IBased.Community storage _community = communities[_commId];
        _community.noOfMembers = _community.noOfMembers - 1;

        delete myCommunities[_member][_commId];

        emit MemberRemoved(_member, _commId);
    }

      function _addMember(
        mapping(bytes32 => IBased.Community) storage communities, 
        mapping (bytes32 => mapping (address => IBased.Member)) storage members,
        mapping (address => mapping (bytes32 => IBased.Community)) storage myCommunities,
        address _caller,
        address _member, 
        bytes32 _commId
        ) public {

        if (communities[_commId].creator != _caller) 
            revert BasedErrors.NOT_ALLOWED(_caller);
        
        IBased.Member storage _communityMember = members[_commId][_member];
        if (_communityMember.isMember) revert BasedErrors.ALREADY_A_MEMBER(_member);

        _communityMember.isMember = true;

        IBased.Community storage _community = communities[_commId];
        _community.noOfMembers = _community.noOfMembers + 1;

        myCommunities[_member][_commId] = _community;

        emit MemberAdded(_member, _commId);
    }

    function _memberLeaves(
        mapping(bytes32 => IBased.Community) storage communities, 
        mapping (bytes32 => mapping (address => IBased.Member)) storage members,
        mapping (address => mapping (bytes32 => IBased.Community)) storage myCommunities,
        bytes32 _commId, 
        address _member
        ) public {

        if (!members[_commId][_member].isMember) revert BasedErrors.NOT_A_MEMBER(_member);

        delete members[_commId][_member];

        delete myCommunities[_member][_commId];


        IBased.Community storage _community = communities[_commId];
        _community.noOfMembers = _community.noOfMembers + 1;

        emit MemberLeft(_member, _commId);
    }   

}

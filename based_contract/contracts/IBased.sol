// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBased {

    event Deployed(address indexed contractAddress);
    event Registered(address indexed userAddress, string indexed username);
    event UsernameUpdated(string indexed username, uint256 indexed timeOfChange);
    event PictureUpdated(address indexed user, string indexed _userPicture);
    event CommunityCreated(bytes32 indexed _commId, string indexed _communityName);
    event JoinedCommunity(address indexed _caller, bytes32 indexed _commId);
    event MemberRemoved(address indexed  _member, bytes32 indexed  _commId);
    event MemberAdded(address indexed _member, bytes32 indexed _commId);
    event MemberLeft(address indexed _member, bytes32 indexed _commId);
    event ProjectCreated(address indexed _caller, bytes32 indexed _projectId);
    event JoinedProject(address indexed _caller, bytes32 indexed _projId);
    event PostCreated(address indexed _caller, bytes32 indexed _postId);
    

    struct User {
        string fullName;
        string bio;
        string portfolioLink;
        string[] skills;
        string country;
        uint256 followers;
        uint256 following;
        address userAddress;
        string userPicture;
        string username;
        uint256 updateUsername;
        uint256 registeredAt;
        bytes32[] myCommunitiesId;
    }

    struct UserDetails {
        string fullName;
        string bio;
        string portfolioLink;
        string[] skills;
        string country;
        string userPicture;
        string username;
    }

    //["Michael Dean", "I am a smart contract developer", "htts://myprofilelink.com", ["Java", "Solidity", "Cairo", "Rust"], "Nigeria", "my picture", "dean8ix"]

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

    struct Project {
        bytes32 projectId;
        address creator;
        string projectName;
        string projectImage;
        string description;
        string[] techUsed;
        string projectStage;
        string category;
        uint256 members;
        string projectGoals;
        string[] projectLinks;
    }

    struct ProjectData {
        string projectName;
        string projectImage;
        string description;
        string[] techUsed;
        string projectStage;
        string category;
        string projectGoals;
        string[] projectLinks;
    }

    struct ProjectMember {
        address member;
        string portfolioLink;
        string emailAddress;
        bool isMember;
        uint256 joinedAt;
    }

    struct Post {
        address creator;
        bytes32 postId;
        string post;
        string postImage;
        uint256 createdAt;
        uint256 likes;
        uint256 comments;
        uint256 repost;
        uint256 bookmark;
    }

    struct Comment {
        address commenter;
        
        bytes32 commentId;
        string comment;
        uint256 createdAt;
        uint256 likes;
    }

    
}
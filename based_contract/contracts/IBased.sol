// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBased {

      struct User {
        string fullName;
        string bio;
        string portfolioLink;
        string[] skills;
        string country;
        address[] followers;
        uint256 noOfFollowers;
        uint256 noOfFollowing;
        address[] following;
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
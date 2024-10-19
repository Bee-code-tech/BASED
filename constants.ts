export const CONTRACT_ADDRESS = "0x442576ef8EA93B6aA30cb7C779b8cC1e402bca5e"

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paymentTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "changeTime",
        type: "uint256",
      },
    ],
    name: "CANNOT_UPDATE_USERNAME_YET",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "INSUFFICIENT",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "zero",
        type: "address",
      },
    ],
    name: "NOT_ALLOWED",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "NOT_A_USER",
    type: "error",
  },
  {
    inputs: [],
    name: "REGISTRATION_FAILED",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "string",
        name: "_communityName",
        type: "string",
      },
    ],
    name: "CommunityCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "Deployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "_userPicture",
        type: "string",
      },
    ],
    name: "PictureUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "timeOfChange",
        type: "uint256",
      },
    ],
    name: "UsernameUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
    ],
    name: "addCommunityMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_postId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_comment",
        type: "string",
      },
    ],
    name: "commentOnPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_communityName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "createCommunity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_post",
        type: "string",
      },
      {
        internalType: "string",
        name: "_postImage",
        type: "string",
      },
    ],
    name: "createPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "projectName",
            type: "string",
          },
          {
            internalType: "string",
            name: "projectImage",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "techUsed",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "projectStage",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "projectGoals",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "projectLinks",
            type: "string[]",
          },
        ],
        internalType: "struct ProjectLib.ProjectData",
        name: "_projectData",
        type: "tuple",
      },
    ],
    name: "createProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userToFollow",
        type: "address",
      },
    ],
    name: "followAUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
    ],
    name: "getCommunity",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "communityId",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "communityName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "noOfMembers",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "members",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CommunityLib.Community",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
    ],
    name: "getCommunityMember",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "member",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isMember",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "joinedAt",
            type: "uint256",
          },
        ],
        internalType: "struct CommunityLib.Member",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAdd",
        type: "address",
      },
    ],
    name: "getMyCommunities",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "communityId",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "communityName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "noOfMembers",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "members",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct CommunityLib.Community[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyFollowers",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "fullName",
            type: "string",
          },
          {
            internalType: "string",
            name: "bio",
            type: "string",
          },
          {
            internalType: "string",
            name: "portfolioLink",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "skills",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "country",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "followers",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "noOfFollowers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noOfFollowing",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "following",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userPicture",
            type: "string",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "updateUsername",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "registeredAt",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "myCommunitiesId",
            type: "bytes32[]",
          },
        ],
        internalType: "struct UserProfileLib.User[]",
        name: "_myFollowers",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyFollowings",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "fullName",
            type: "string",
          },
          {
            internalType: "string",
            name: "bio",
            type: "string",
          },
          {
            internalType: "string",
            name: "portfolioLink",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "skills",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "country",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "followers",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "noOfFollowers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noOfFollowing",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "following",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userPicture",
            type: "string",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "updateUsername",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "registeredAt",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "myCommunitiesId",
            type: "bytes32[]",
          },
        ],
        internalType: "struct UserProfileLib.User[]",
        name: "_myFollowers",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_projId",
        type: "bytes32",
      },
    ],
    name: "getProject",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "projectId",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "string",
            name: "projectName",
            type: "string",
          },
          {
            internalType: "string",
            name: "projectImage",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "techUsed",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "projectStage",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "members",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "projectGoals",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "projectLinks",
            type: "string[]",
          },
        ],
        internalType: "struct ProjectLib.Project",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_projId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
    ],
    name: "getProjectMember",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "member",
            type: "address",
          },
          {
            internalType: "string",
            name: "portfolioLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "emailAddress",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isMember",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "joinedAt",
            type: "uint256",
          },
        ],
        internalType: "struct ProjectLib.ProjectMember",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_caller",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "fullName",
            type: "string",
          },
          {
            internalType: "string",
            name: "bio",
            type: "string",
          },
          {
            internalType: "string",
            name: "portfolioLink",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "skills",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "country",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "followers",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "noOfFollowers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noOfFollowing",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "following",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userPicture",
            type: "string",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "updateUsername",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "registeredAt",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "myCommunitiesId",
            type: "bytes32[]",
          },
        ],
        internalType: "struct UserProfileLib.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_postId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_commentId",
        type: "bytes32",
      },
    ],
    name: "getUserComment",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "commenter",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "commentId",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "likes",
            type: "uint256",
          },
        ],
        internalType: "struct PostLib.Comment",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
    ],
    name: "joinCommunity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_projId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_portfolioLink",
        type: "string",
      },
      {
        internalType: "string",
        name: "_emailAddress",
        type: "string",
      },
    ],
    name: "joinProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_projId",
        type: "bytes32",
      },
    ],
    name: "leaveProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_postId",
        type: "bytes32",
      },
    ],
    name: "likePost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
    ],
    name: "memberLeavesCommunity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_member",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_commId",
        type: "bytes32",
      },
    ],
    name: "removeCommunityMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userToUnFollow",
        type: "address",
      },
    ],
    name: "unfollowAUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userPicture",
        type: "string",
      },
    ],
    name: "updatePicture",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
    ],
    name: "updateUsername",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "fullName",
            type: "string",
          },
          {
            internalType: "string",
            name: "bio",
            type: "string",
          },
          {
            internalType: "string",
            name: "portfolioLink",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "skills",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "country",
            type: "string",
          },
          {
            internalType: "string",
            name: "userPicture",
            type: "string",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
        ],
        internalType: "struct UserProfileLib.UserDetails",
        name: "_userDetails",
        type: "tuple",
      },
    ],
    name: "userRegisters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

//contract address: 0x442576ef8EA93B6aA30cb7C779b8cC1e402bca5e
//verified: https://sepolia.basescan.org/address/0x442576ef8EA93B6aA30cb7C779b8cC1e402bca5e#code

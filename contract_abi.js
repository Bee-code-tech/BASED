export const contract_abi = [
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
        internalType: "struct IBased.ProjectData",
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
    inputs: [],
    name: "getAllCommunitie",
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
        internalType: "struct IBased.Community[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPosts",
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
            name: "postId",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "post",
            type: "string",
          },
          {
            internalType: "string",
            name: "postImage",
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
          {
            internalType: "uint256",
            name: "comments",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "repost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bookmark",
            type: "uint256",
          },
        ],
        internalType: "struct IBased.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProjects",
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
        internalType: "struct IBased.Project[]",
        name: "",
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
        internalType: "struct IBased.Community",
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
        internalType: "struct IBased.Member",
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
        internalType: "struct IBased.Community[]",
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
        internalType: "struct IBased.User[]",
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
        internalType: "struct IBased.User[]",
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
        internalType: "struct IBased.Project",
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
        internalType: "struct IBased.ProjectMember",
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
        internalType: "struct IBased.User",
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
        internalType: "struct IBased.Comment",
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
        name: "_bio",
        type: "string",
      },
    ],
    name: "updateBio",
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
        name: "_portfolioLink",
        type: "string",
      },
    ],
    name: "updatePortfolioLink",
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
        internalType: "struct IBased.UserDetails",
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

// payment: 0x527caBd4bb83F94f1Fc1888D0691EF95e86795A1
// https://sepolia.basescan.org/address/0x527caBd4bb83F94f1Fc1888D0691EF95e86795A1#code

// based: 0xf36f55D6Df2f9d5C7829ed5751d7E88FD3E82c2E
// https://sepolia.basescan.org/address/0xf36f55D6Df2f9d5C7829ed5751d7E88FD3E82c2E#code

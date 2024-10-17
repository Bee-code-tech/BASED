// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BasedErrors.sol";
import "./IBased.sol";

library PostLib {

    event PostCreated(address indexed _caller, bytes32 indexed _postId);
    event CommentedOnPost(address indexed _commenter, bytes32 indexed _postId, bytes32 indexed _commentId);
    event PostLiked(bytes32 indexed _postId, uint256 likeCount);

    

    function _createPost(
        mapping (bytes32 => IBased.Post) storage posts,
        IBased.Post[] storage allPosts,
        address _creator, 
        string memory _post_, 
        string memory _postImage
        ) public {

        bytes32 _postId = keccak256(abi.encode(_creator, _post_, _postImage));

        IBased.Post storage _post = posts[_postId];
        
        _post.creator = _creator;
        _post.postId = _postId;
        _post.post = _post_;
        _post.postImage = _postImage;
        _post.createdAt = block.timestamp;

        allPosts.push(_post);

        emit PostCreated(_creator, _postId);
    }

    function _getAllPosts(IBased.Post[] storage allPosts) public pure returns (IBased.Post[] memory) {
        return allPosts;
    }

    function _commentOnPost(
        mapping (bytes32 => IBased.Post) storage posts,
        mapping (bytes32 => mapping (bytes32 => IBased.Comment)) storage userComment,
        address _commenter,
        bytes32 _postId,
        string memory _comment
    ) public {

        IBased.Post storage _post = posts[_postId];
        if (_post.creator == address(0)) revert BasedErrors.POST_NOT_FOUND(_postId);

        bytes32 _commentId = keccak256(abi.encode(_commenter, _comment));

        IBased.Comment storage _userComment = userComment[_postId][_commentId];
        _userComment.commenter = _commenter;
        _userComment.commentId = _commentId;
        _userComment.comment = _comment;
        _userComment.createdAt = block.timestamp;

        _post.comments = _post.comments + 1;

        emit CommentedOnPost(_commenter, _postId, _commentId);
    }

    function _getUserComment(
        mapping (bytes32 => mapping (bytes32 => IBased.Comment)) storage userComment,
        bytes32 _postId,
        bytes32 _commentId
    ) public view returns (IBased.Comment memory) {
        return userComment[_postId][_commentId];
    }

    function _likePost(
        mapping (bytes32 => IBased.Post) storage posts,
        bytes32 _postId
    ) public {
        posts[_postId].likes += 1;

        emit PostLiked(_postId, posts[_postId].likes);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BasedErrors.sol";

library ProjectLib {

    event ProjectCreated(address indexed _creator, bytes32 indexed _projectId);
    event JoinedProject(address indexed _member, bytes32 indexed _projId);
    event MemberLeft(address indexed _member, bytes32 indexed _projId);


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


    function _createProject(
        mapping (bytes32 => Project) storage projects,
        address _creator, 
        ProjectData memory _projectData
        ) public {

        bytes32 _projectId = keccak256(abi.encode(_projectData));

        Project storage _project = projects[_projectId];

        _project.projectId = _projectId;
        _project.creator = _creator;
        _project.projectName = _projectData.projectName;
        _project.projectImage = _projectData.projectImage;
        _project.description = _projectData.description;
        _project.techUsed = _projectData.techUsed;
        _project.projectStage = _projectData.projectStage;
        _project.category = _projectData.category;
        _project.projectGoals = _projectData.projectGoals;
        _project.projectLinks = _projectData.projectLinks;

        emit ProjectCreated(_creator, _projectId);
    }

    function _joinProject(
        mapping (bytes32 => Project) storage projects,
        mapping (bytes32 => mapping (address => ProjectMember)) storage projectMembers,
        address _member, 
        bytes32 _projId,
        string memory _portfolioLink,
        string memory _emailAddress
    ) public {

        if (projectMembers[_projId][_member].isMember) 
            revert BasedErrors.ALREADY_A_MEMBER(_member);
        
        ProjectMember storage _projectMember = projectMembers[_projId][_member];
        _projectMember.member = _member;
        _projectMember.portfolioLink = _portfolioLink;
        _projectMember.emailAddress = _emailAddress;
        _projectMember.isMember = true;
        _projectMember.joinedAt = block.timestamp;

        projects[_projId].members = projects[_projId].members + 1;

        emit JoinedProject(_member, _projId);
    }

     function _leaveProject(
        mapping (bytes32 => Project) storage projects,
        mapping (bytes32 => mapping (address => ProjectMember)) storage projectMembers,
        address _member, 
        bytes32 _projId
        ) public {

        if (!projectMembers[_projId][_member].isMember) 
            revert BasedErrors.NOT_A_MEMBER(_member);

        delete projectMembers[_projId][_member];

        Project storage _project = projects[_projId];
        _project.members = _project.members - 1;

        emit MemberLeft(_member, _projId);
    } 

    function _getProject(
        mapping (bytes32 => Project) storage projects,
        bytes32 _projId
    ) public view returns (Project memory) {
        return projects[_projId];
    }

     function _getProjectMember(
        mapping (bytes32 => mapping (address => ProjectMember)) storage projectMembers,
        bytes32 _projId, address _member
    ) public view returns (ProjectMember memory) {

        ProjectMember memory _projectMember = projectMembers[_projId][_member];

        if (!_projectMember.isMember) revert BasedErrors.NOT_A_MEMBER(_member);

        return _projectMember;        
    }
}


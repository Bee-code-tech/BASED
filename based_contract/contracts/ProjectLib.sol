// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BasedErrors.sol";
import "./IBased.sol";

library ProjectLib {

    event ProjectCreated(address indexed _creator, bytes32 indexed _projectId);
    event JoinedProject(address indexed _member, bytes32 indexed _projId);
    event MemberLeft(address indexed _member, bytes32 indexed _projId);

//0x3ee96b78449050fe0ccc91d9d7e2ccc89c9b4755adf63d1675f0e3f5f29af7c0
//0x00151a92cd40b24f54d77f570f2407b9db703cec3f9742f273f357a2302059f0


    function _createProject(
        mapping (bytes32 => IBased.Project) storage projects,
        IBased.Project[] storage allProjects,
        address _creator, 
        IBased.ProjectData memory _projectData
        ) public {

        bytes32 _projectId = keccak256(abi.encode(_projectData));

        IBased.Project storage _project = projects[_projectId];

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

        allProjects.push(_project);

        emit ProjectCreated(_creator, _projectId);
    }

    function _getAllProjects(IBased.Project[] storage allProjects) public pure returns (IBased.Project[] memory) {
        return allProjects;
    }

    function _joinProject(
        mapping (bytes32 => IBased.Project) storage projects,
        mapping (bytes32 => mapping (address => IBased.ProjectMember)) storage projectMembers,
        address _member, 
        bytes32 _projId,
        string memory _portfolioLink,
        string memory _emailAddress
    ) public {

        if (projectMembers[_projId][_member].isMember) 
            revert BasedErrors.ALREADY_A_MEMBER(_member);
        
        IBased.ProjectMember storage _projectMember = projectMembers[_projId][_member];
        _projectMember.member = _member;
        _projectMember.portfolioLink = _portfolioLink;
        _projectMember.emailAddress = _emailAddress;
        _projectMember.isMember = true;
        _projectMember.joinedAt = block.timestamp;

        projects[_projId].members = projects[_projId].members + 1;

        emit JoinedProject(_member, _projId);
    }

     function _leaveProject(
        mapping (bytes32 => IBased.Project) storage projects,
        mapping (bytes32 => mapping (address => IBased.ProjectMember)) storage projectMembers,
        address _member, 
        bytes32 _projId
        ) public {

        if (!projectMembers[_projId][_member].isMember) 
            revert BasedErrors.NOT_A_MEMBER(_member);

        delete projectMembers[_projId][_member];

        IBased.Project storage _project = projects[_projId];
        _project.members = _project.members - 1;

        emit MemberLeft(_member, _projId);
    } 

    function _getProject(
        mapping (bytes32 => IBased.Project) storage projects,
        bytes32 _projId
    ) public view returns (IBased.Project memory) {
        return projects[_projId];
    }

     function _getProjectMember(
        mapping (bytes32 => mapping (address => IBased.ProjectMember)) storage projectMembers,
        bytes32 _projId, address _member
    ) public view returns (IBased.ProjectMember memory) {

        IBased.ProjectMember memory _projectMember = projectMembers[_projId][_member];

        if (!_projectMember.isMember) revert BasedErrors.NOT_A_MEMBER(_member);

        return _projectMember;        
    }
}


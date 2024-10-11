'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { PlusCircleIcon, X } from 'lucide-react';
import Image from 'next/image';

const CreateProjectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  // State for animation and project details
  const [isClosing, setIsClosing] = useState(false); // New state for tracking modal close animation
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    category: '',
    description: '',
    teamMembers: '',
    technologies: '',
    goals: '',
    stage: '',
    links: '',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setProjectDetails({ ...projectDetails, image: reader.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Trigger file input when the button is clicked
  const handleAddPictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically open file input dialog
    }
  };

  // Function to handle closing the modal with animation
  const closeModal = () => {
    setIsClosing(true); // Trigger the closing animation
    setTimeout(onClose, 300); // Wait for the animation to complete before closing
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project Details:', projectDetails);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-3" onClick={closeModal}>
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[700px] overflow-scroll relative z-50 ${
          isClosing ? 'animate-zoom-out' : 'animate-zoom-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button onClick={closeModal} className="absolute top-4 right-4">
          <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Project</h2>

        {/* Image Upload Section */}
        <div className="mb-6">
          <div className="w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 relative">
            {projectDetails.image ? (
              <Image src={projectDetails.image} alt="Project" layout="fill" objectFit="cover" className="rounded-lg" />
            ) : (
              <PlusCircleIcon className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <Button variant="secondary" className="bg-neutral-200 text-gray-700" onClick={handleAddPictureClick}>
            Add Picture
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Project Name */}
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
              <Input
                type="text"
                id="projectName"
                name="projectName"
                placeholder="Enter project name"
                value={projectDetails.projectName}
                onChange={handleInputChange}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <Select onValueChange={(value) => setProjectDetails({ ...projectDetails, category: value })}>
                <SelectTrigger className="w-full" onMouseDown={(e) => e.stopPropagation()}>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent onMouseDown={(e) => e.stopPropagation()}>
                  <SelectItem value="defi">DeFi</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Short description"
                value={projectDetails.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Team Members */}
            <div>
              <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">Team Members</label>
              <Input
                type="text"
                id="teamMembers"
                name="teamMembers"
                placeholder="Enter team members"
                value={projectDetails.teamMembers}
                onChange={handleInputChange}
              />
            </div>

            {/* Technologies Used */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies Used</label>
              <Input
                type="text"
                id="technologies"
                name="technologies"
                placeholder="Technologies used"
                value={projectDetails.technologies}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Goals */}
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Project Goals</label>
              <Input
                type="text"
                id="goals"
                name="goals"
                placeholder="Enter project goals"
                value={projectDetails.goals}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Stage */}
            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Project Stage</label>
              <Select onValueChange={(value) => setProjectDetails({ ...projectDetails, stage: value })}>
                <SelectTrigger className="w-full" onMouseDown={(e) => e.stopPropagation()}>
                  <SelectValue placeholder="Select Stage" />
                </SelectTrigger>
                <SelectContent onMouseDown={(e) => e.stopPropagation()}>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="prototype">Prototype</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Links to GitHub or Website */}
            <div>
              <label htmlFor="links" className="block text-sm font-medium text-gray-700">Links (GitHub/Website)</label>
              <Input
                type="text"
                id="links"
                name="links"
                placeholder="Enter project links"
                value={projectDetails.links}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-primaryColor text-white">
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;

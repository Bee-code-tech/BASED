'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { PlusCircleIcon, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from "react-toastify";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import type { ContractFunctionParameters } from "viem";
import { CONTRACT_ADDRESS, ABI } from "@/constants";

interface ProjectData {
  projectName: string;
  projectImage: string;
  description: string;
  techUsed: string[];
  projectStage: string;
  category: string;
  projectGoals: string;
  projectLinks: string[];
}

const INITIAL_PROJECT_DATA: ProjectData = {
  projectName: '',
  projectImage: '',
  description: '',
  techUsed: [],
  projectStage: '',
  category: '',
  projectGoals: '',
  projectLinks: []
};

const CreateProjectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isClosing, setIsClosing] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectData>(INITIAL_PROJECT_DATA);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({
      ...prev,
      [name]: name === 'techUsed' || name === 'projectLinks' 
        ? value.split(',').map(item => item.trim())
        : value
    }));
  }, []);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          setProjectDetails(prev => ({
            ...prev,
            projectImage: reader.result as string
          }));
        };
        reader.readAsDataURL(e.target.files[0]);
      } catch (error) {
        toast.error('Failed to upload image');
        console.error('Image upload failed:', error);
      }
    }
  }, []);

  const handleAddPictureClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    toast.info(status.statusName);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setProjectDetails(prev => ({ ...prev, category: value }));
  }, []);

  const handleStageChange = useCallback((value: string) => {
    setProjectDetails(prev => ({ ...prev, projectStage: value }));
  }, []);

  const isFormValid = useMemo(() => {
    return !!(
      projectDetails.projectName &&
      projectDetails.description &&
      projectDetails.category &&
      projectDetails.projectStage &&
      projectDetails.projectGoals &&
      projectDetails.techUsed.length > 0
    );
  }, [projectDetails]);

  // Memoize the contract parameters
  const contractParams = useMemo(() => [{
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ABI,
    functionName: "createProject",
    args: [{
      projectName: projectDetails.projectName,
      projectImage: projectDetails.projectImage,
      description: projectDetails.description,
      techUsed: projectDetails.techUsed,
      projectStage: projectDetails.projectStage,
      category: projectDetails.category,
      projectGoals: projectDetails.projectGoals,
      projectLinks: projectDetails.projectLinks
    }],
  }] as unknown as ContractFunctionParameters[], [projectDetails]);

  // Outside click handler
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
  }, [closeModal]);

  // Memoize the Transaction component
  const TransactionComponent = useMemo(() => (
    <Transaction
      contracts={contractParams}
      chainId={84532}
      onStatus={handleOnStatus}
    >
      <TransactionButton
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        text="Create Project"
        disabled={!isFormValid}
      />
      <TransactionStatus>
        <TransactionStatusLabel />
      </TransactionStatus>
    </Transaction>
  ), [contractParams, handleOnStatus, isFormValid]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-3" onClick={closeModal}>
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[700px] overflow-scroll relative z-50 ${
          isClosing ? 'animate-zoom-out' : 'animate-zoom-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeModal} className="absolute top-4 right-4">
          <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Project</h2>

        <div className="mb-6">
          <div className="w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 relative">
            {projectDetails.projectImage ? (
              <Image src={projectDetails.projectImage} alt="Project" layout="fill" objectFit="cover" className="rounded-lg" />
            ) : (
              <PlusCircleIcon className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <button 
            className="px-4 py-2 bg-neutral-200 text-gray-700 rounded-md hover:bg-neutral-300"
            onClick={handleAddPictureClick}
          >
            Add Picture
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <Input
              type="text"
              name="projectName"
              placeholder="Enter project name"
              value={projectDetails.projectName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <Select onValueChange={handleCategoryChange}>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Input
              type="text"
              name="description"
              placeholder="Short description"
              value={projectDetails.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies Used (comma-separated)</label>
            <Input
              type="text"
              name="techUsed"
              placeholder="React, Solidity, Next.js"
              value={projectDetails.techUsed.join(', ')}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Goals</label>
            <Input
              type="text"
              name="projectGoals"
              placeholder="Enter project goals"
              value={projectDetails.projectGoals}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Stage</label>
            <Select onValueChange={handleStageChange}>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Links (comma-separated)</label>
            <Input
              type="text"
              name="projectLinks"
              placeholder="GitHub URL, Website URL"
              value={projectDetails.projectLinks.join(', ')}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {TransactionComponent}
      </div>
    </div>
  );
};

export default CreateProjectModal;
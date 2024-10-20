'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { useReadContracts, useAccount } from "wagmi";
import { CONTRACT_ADDRESS, ABI } from "@/constants";
import { toast } from "react-toastify";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import type { ContractFunctionParameters } from "viem";

interface Community {
  creator: string;
  id: string;
  communityName: string;
  description: string;
  noOfMembers: string;
  members: string[];
  createdAt: string;
}

const CreatePostModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);
  // Changed selectedCommunity type to string
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');
  const [postContent, setPostContent] = useState('');

  const { address } = useAccount();

  const { data: commData, isError, isLoading } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "getMyCommunities",
        args: [address],
      },
    ],
  });

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    toast.info(status.statusName);
  }, []);

  const convertToCommunity = useCallback((item: any, index: number): Community => {
    return {
      id: item.communityId || `doc_${index}`,
      creator: item.creator || "",
      description: item.description || "",
      members: Array.isArray(item.members) ? item.members : [],
      noOfMembers: item.noOfMembers?.toString() || "0",
      communityName: item.communityName || "",
      createdAt: item.createdAt || "",
    };
  }, []);

  const convertResult = useCallback(() => {
    if (!commData || !Array.isArray(commData)) return;

    const userCommunitiesData = commData[0]?.result;

    if (Array.isArray(userCommunitiesData)) {
      const ucd = userCommunitiesData.map(convertToCommunity);
      setCommunities(ucd);
    } else {
      setCommunities([]);
    }
  }, [commData, convertToCommunity]);

  useEffect(() => {
    if (commData && !isLoading && !isError) {
      convertResult();
    }
  }, [commData, isLoading, isError, convertResult]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Community:', selectedCommunity);
    console.log('Post Content:', postContent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Find the selected community object based on the selected ID
  const selectedCommunityObject = communities.find(comm => comm.id === selectedCommunity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}>
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeModal} className="absolute top-4 right-4">
          <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>

        <div className="mb-4">
          <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">Select Community</label>
          <Select onValueChange={setSelectedCommunity}>
            <SelectTrigger className="w-full" onMouseDown={handleMouseDown}>
              <SelectValue placeholder="Select a community" />
            </SelectTrigger>
            <SelectContent onMouseDown={handleMouseDown}>
              {communities.map((community) => (
                <SelectItem key={community.id} value={community.id}>
                  {community.communityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <textarea
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
          rows={5}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        <Transaction
          contracts={[
            {
              address: CONTRACT_ADDRESS as `0x${string}`,
              abi: ABI,
              functionName: "createPost",
              args: [selectedCommunity, postContent],
            },
          ] as unknown as ContractFunctionParameters[]}
          chainId={84532}
          onStatus={handleOnStatus}
        >
          <TransactionButton
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg"
            text="Post"
          />
          <TransactionStatus>
            <TransactionStatusLabel />
          </TransactionStatus>
        </Transaction>
      </div>
    </div>
  );
};

export default CreatePostModal;
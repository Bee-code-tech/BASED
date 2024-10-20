"use client";
import SearchCommunity from "@/components/SearchCommunity";
import React, { useState, useEffect, useCallback } from "react";
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

// Separate component for the join button to handle transactions
const JoinCommunityButton = ({ communityId }: { communityId: string }) => {
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    toast.info(status.statusName);
  }, []);

  return (
    <Transaction
      contracts={[
        {
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "joinCommunity",
          args: [communityId],
        },
      ] as unknown as ContractFunctionParameters[]}
      chainId={84532}
      onStatus={handleOnStatus}
    >
      <TransactionButton
        className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg"
        text="Join"
      />
      <TransactionStatus>
        <TransactionStatusLabel />
      </TransactionStatus>
    </Transaction>
  );
};

const CommunityCard = ({ 
  member, 
  isJoined 
}: { 
  member: Community; 
  isJoined: boolean;
}) => {
  return (
    <div className="bg-neutral-50 p-4 sm:p-6 rounded-2xl border-neutral-300 border">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {member.communityName.charAt(0)}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{member.communityName}</h3>
          <p className="text-gray-600">{member.noOfMembers} members</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{member.description}</p>
      {isJoined ? (
        <button
          className="w-auto py-2 px-4 rounded-xl bg-gray-400 text-white cursor-not-allowed"
          disabled={true}
        >
          Joined
        </button>
      ) : (
        <JoinCommunityButton communityId={member.id} />
      )}
    </div>
  );
};

const CommunitiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [notJoined, setNotJoined] = useState<Community[]>([]);

  const { address } = useAccount();
  const { data, isLoading, isError } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "getMyCommunities",
        args: [address],
      },
      {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "getAllCommunitie",
        args: [],
      },
    ],
  });

  const convertToCommunity = useCallback((item: any, index: number): Community => ({
    id: item.communityId || `doc_${index}`,
    creator: item.creator || "",
    description: item.description || "",
    members: Array.isArray(item.members) ? item.members : [],
    noOfMembers: item.noOfMembers?.toString() || "0",
    communityName: item.communityName || "",
    createdAt: item.createdAt || "",
  }), []);

  const convertResult = useCallback(() => {
    if (!data || !Array.isArray(data)) return;
    
    const userCommunitiesData = data[0]?.result;
    const allCommunitiesData = data[1]?.result;

    if (Array.isArray(userCommunitiesData)) {
      const ucd = userCommunitiesData.map(convertToCommunity);
      setUserCommunities(ucd);
    } else {
      setUserCommunities([]);
    }

    if (Array.isArray(allCommunitiesData)) {
      const upd = allCommunitiesData.map(convertToCommunity);
      setAllCommunities(upd);
    } else {
      setAllCommunities([]);
    }
  }, [data, convertToCommunity]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      convertResult();
      setLoading(false);
    }
  }, [data, isLoading, isError, convertResult]);

  useEffect(() => {
    if (allCommunities.length > 0) {
      if (userCommunities.length === 0) {
        setNotJoined(allCommunities);
      } else {
        const notJoinedCommunities = allCommunities.filter(
          (item) => !userCommunities.some((community) => community.id === item.id)
        );
        setNotJoined(notJoinedCommunities);
      }
    }
  }, [allCommunities, userCommunities]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 items-start justify-center min-h-screen container mx-auto gap-6">
      <div className="col-span-1 lg:col-span-7 h-full w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8 border border-neutral-300 border-b border-r border-l border-t-transparent pt-8 sm:pt-10 lg:pt-12">
          {userCommunities?.map((member, index) => (
            <CommunityCard
              key={`user-${member.id}-${index}`}
              member={member}
              isJoined={true}
            />
          ))}
          
          {notJoined?.map((member, index) => (
            <CommunityCard
              key={`not-joined-${member.id}-${index}`}
              member={member}
              isJoined={false}
            />
          ))}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3 h-full w-full mt-6 lg:mt-12">
        <SearchCommunity title="Top Communities Post" />
      </div>
    </div>
  );
};

export default CommunitiesPage;
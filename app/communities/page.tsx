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
  TransactionStatusAction,
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

const CommunitiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [notJoined, setNotJoined] = useState<Community[]>([]);
  const [isTransactionReady, setisTransactionReady] = useState(false);

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
        functionName: "getAllCommunities",
        args: [address],
      },
    ],
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      convertResult();
      const notjoined = allCommunities.filter(
        (item) => !userCommunities.includes(item)
      );
      setNotJoined(notjoined);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

  const convertResult = () => {
    if (!data || !Array.isArray(data)) return;

    const userCommunities = data[0].result;
    const allCommunities = data[1].result;

    const convertToCommunity = (item: any, index: number): Community => ({
      id: item.communityId || `doc_${index}`,
      creator: item.creator || "",
      description: item.description || "",
      members: Array.isArray(item.members) ? item.members : [],
      noOfMembers: item.noOfMembers,
      communityName: item.communityName || "",
      createdAt: item.createdAt || "",
    });

    if (Array.isArray(userCommunities)) {
      const ucd = userCommunities.map(convertToCommunity);
      setUserCommunities(ucd);
    } else {
      setUserCommunities([]);
    }

    if (Array.isArray(allCommunities)) {
      const upd = allCommunities.map(convertToCommunity);
      setAllCommunities(upd);
    } else {
      setAllCommunities([]);
    }
  };

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    toast.info(status.statusName);
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 items-start justify-center min-h-screen container mx-auto gap-6">
      {/* Left section with team cards */}
      <div className="col-span-1 lg:col-span-7 h-full w-full">
        {/* List of the cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8 border border-neutral-300 border-b border-r border-l border-t-transparent pt-8 sm:pt-10 lg:pt-12">
          {userCommunities?.map((member, index) => (
            <div
              key={index}
              className="bg-neutral-50 p-4 sm:p-6 rounded-2xl border-neutral-300 border"
            >
              {/* Profile and Name Row */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    // src={member.profilePic}
                    alt={member.communityName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {member.communityName}
                  </h3>
                  <p className="text-gray-600">{member.noOfMembers} members</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{member.description}</p>

              {/* Request to Join / Joined Button */}
              <button
                className={`w-auto py-2 px-4 rounded-xl bg-gray-400 text-white cursor-not-allowed"
                 
                }`}
                disabled={true}
              >
                "Joined"
              </button>
            </div>
          ))}
          {notJoined?.map((member, index) => (
            <div
              key={index}
              className="bg-neutral-50 p-4 sm:p-6 rounded-2xl border-neutral-300 border"
            >
              {/* Profile and Name Row */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    // src={member.profilePic}
                    alt={member.communityName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {member.communityName}
                  </h3>
                  <p className="text-gray-600">{member.noOfMembers} members</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{member.description}</p>

              {/* Request to Join / Joined Button */}
              <Transaction
                contracts={
                  [
                    {
                      address: CONTRACT_ADDRESS,
                      abi: ABI,
                      functionName: "joinCommunity",
                      args: [member.id],
                    },
                  ] as unknown as ContractFunctionParameters[]
                }
                chainId={84532}
                onStatus={handleOnStatus}
              >
                <TransactionButton
                  className="w-50 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg  ml-auto"
                  text="Join"
                  disabled={!isTransactionReady}
                />
                <TransactionStatus>
                  <TransactionStatusLabel />
                </TransactionStatus>
              </Transaction>
            </div>
          ))}
        </div>
      </div>

      {/* Right section with SearchCommunity */}
      <div className="col-span-1 lg:col-span-3 h-full w-full mt-6 lg:mt-12">
        <SearchCommunity title="Top Communities Post" />
      </div>
    </div>
  );
};

export default CommunitiesPage;

'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface ProfileFormData {
  name: string;
  handle: string;
  bio: string;
  skills: string;
  portfolio: string;
  country: string;
  profilePic?: string;
}

const ProfilePage = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    handle: '',
    bio: '',
    skills: '',
    portfolio: '',
    country: '',
    profilePic: ""
  });

  // Transaction status management
  const [status, setStatus] = useState<string>("new");
  const [hash, setHash] = useState<string>("");
  const [transactionArgs, setTransactionArgs] = useState<(string | undefined)[]>();
  const [ready, setReady] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileFormData | null>(null);

  const { data: profileData, isError, isLoading: isProfileLoading } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "getUser",
        args: [address],
      },
    ],
  });

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl || !imageUrl.toLowerCase().endsWith('.jpg')) {
      return '';
    }
    return imageUrl; // Fixed: Return actual imageUrl instead of string "imageUrl"
  };

  const convertToProfile = useCallback((item: any): ProfileFormData => {
    if (!item) return {
      name: '',
      handle: '',
      bio: '',
      profilePic: '',
      skills: '',
      portfolio: '',
      country: '',
    };

    return {
      name: item.name || '',
      handle: item.handle || '',
      bio: item.bio || '',
      profilePic: getImageUrl(item.profilePic), // Fixed: Changed from postImage to profilePic
      skills: item.skills || '',
      portfolio: item.portfolio || '',
      country: item.country || '',
    };
  }, []);

  useEffect(() => {
    if (!isProfileLoading && !isError && profileData?.[0]?.result) {
      const convertedProfile = convertToProfile(profileData[0].result);
      setProfile(convertedProfile);
      setFormData(convertedProfile);
    }
  }, [isProfileLoading, isError, profileData, convertToProfile]);

  // Handle input changes
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.handle.trim()) {
      toast.error("Handle is required");
      return false;
    }
    if (!formData.bio.trim()) {
      toast.error("Bio is required");
      return false;
    }
    if (!formData.skills.trim()) {
      toast.error("Skills are required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setStatus("new");

      setTransactionArgs([
        formData.name,
        formData.handle,
        formData.bio,
        formData.skills,
        formData.portfolio || '', // Ensure optional fields have fallback
        formData.country || ''
      ]);

      setStatus("submitted");
      setReady(true);
      toast.success("Updating profile!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
      setStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    toast.info(status.statusName);
  }, []);

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full flex items-start justify-center px-3'>
      <div className="rounded-xl border border-neutral-200 lg:w-1/2 mt-4 w-full">
        {/* Profile Details */}
        <div className="p-6">
          <h1 className="text-4xl font-bold">Your Profile</h1>

          <div className="w-full items-center flex flex-col justify-center mt-8">
            <p className="text-md font-bold mb-3">{formData.handle ? `@${formData.handle}` : '@Username'}</p>

            <div className="flex items-center justify-center gap-6">
              <span className="text-md flex gap-1">
                <span className="font-bold">136</span>
                <span className="font-thin">followers</span>
              </span>
              <span className="text-md flex gap-1">
                <span className="font-bold">21</span>
                <span className="font-thin">following</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <div className="w-24 h-24 bg-green-300 rounded-full" />
              <button className="bg-neutral-200 rounded-md px-3 py-1 mt-4">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-bold">Name</label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              {/* Handle Field */}
              <div className="flex flex-col">
                <label htmlFor="handle" className="mb-1 font-bold">Handle</label>
                <Input
                  type="text"
                  id="handle"
                  placeholder="@handle"
                  value={formData.handle}
                  onChange={(e) => handleInputChange('handle', e.target.value)}
                />
              </div>

              {/* Bio Field */}
              <div className="flex flex-col">
                <label htmlFor="bio" className="mb-1 font-bold">Bio</label>
                <Input
                  type="text"
                  id="bio"
                  placeholder="A short bio about yourself"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              </div>

              {/* Skills Field */}
              <div className="flex flex-col">
                <label htmlFor="skills" className="mb-1 font-bold">Skills</label>
                <Input
                  type="text"
                  id="skills"
                  placeholder="Your skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                />
              </div>

              {/* Portfolio Field */}
              <div className="flex flex-col">
                <label htmlFor="portfolio" className="mb-1 font-bold">Portfolio (optional)</label>
                <Input
                  type="text"
                  id="portfolio"
                  placeholder="Link to portfolio"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                />
              </div>

              {/* Country Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="country" className="mb-1 font-bold">Country (optional)</label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleInputChange('country', value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button with Transaction Status */}
            <div className="mt-6 space-y-4">
              <Transaction
                contracts={[
                  {
                    address: CONTRACT_ADDRESS,
                    abi: ABI,
                    functionName: "updateProfile",
                    args: transactionArgs,
                  },
                ] as unknown as ContractFunctionParameters[]}
                chainId={84532}
                onStatus={handleOnStatus}
              >
                <TransactionButton
                  disabled={isLoading}
                  className="w-full bg-primaryColor text-white px-4 py-1"
                  text={isLoading ? 'Updating Profile...' : 'Update Profile'}
                />
                <TransactionStatus>
                  <TransactionStatusLabel />
                </TransactionStatus>
              </Transaction>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
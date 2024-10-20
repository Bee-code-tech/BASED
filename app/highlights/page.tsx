"use client"
import Post from '@/components/Posts';
import SearchCommunity from '@/components/SearchCommunity';
import React, { useState, useEffect, useCallback } from 'react';
import { useReadContracts, useAccount } from "wagmi";
import { CONTRACT_ADDRESS, ABI } from "@/constants";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";

interface Post {
  creator: string;
  postId: string;
  post: string;
  postImage: string;
  createdAt: string;
  likes: string;
  comments: string;
  repost: string;
  bookmark: string;
}

const Highlight = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { address } = useAccount();
  
  const getImageUrl = (imageUrl: string) => {
    
    if (!imageUrl || !imageUrl.toLowerCase().endsWith('.jpg')) {
    
      return '';
    }
    return "imageUrl";
  };

  const { data, isLoading, isError } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "getAllPosts",
        args: [],
      },
    ],
  });

  const convertToPost = useCallback((item: any): Post => {
    if (!item) return {} as Post;
    
    return {
      postId: item.postId?.toString() || '',
      creator: item.creator || '',
      post: item.post || '',
      postImage: getImageUrl(item.postImage),
      likes: item.likes?.toString() || '0',
      comments: item.comments?.toString() || '0',
      createdAt: item.createdAt || '',
      repost: item.repost?.toString() || '0',
      bookmark: item.bookmark?.toString() || '0'
    };
  }, []);

  const convertResult = useCallback(() => {
    if (!data?.[0]?.result || !Array.isArray(data[0].result)) {
      setPosts([]);
      return;
    }

    const postsData = data[0].result;
    const convertedPosts = postsData
      .filter(Boolean)
      .map(convertToPost);
    
    setPosts(convertedPosts);
  }, [data, convertToPost]);

  useEffect(() => {
    if (!isLoading && !isError) {
      convertResult();
    }
  }, [isLoading, isError, convertResult]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 items-start justify-center min-h-screen container mx-auto gap-6'>
      <div className="col-span-1 lg:col-span-7 w-full flex items-end justify-end lg:pr-10">
        <div className="max-w-full lg:max-w-4xl">
          {posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No posts available</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div className="border border-t-transparent border-b-transparent" key={post.postId || index}>
                <Post
                  title='Post'
                  profilePic={getImageUrl(post.postImage)} 
                  name={post.creator ? `${post.creator.slice(0,6)}...${post.creator.slice(-4)}` : 'Unknown'}
                  tagName={post.creator ? `${post.creator.slice(0,6)}...${post.creator.slice(-4)}` : 'Unknown'}
                  timePosted={post.createdAt}
                  postText={post.post}
                  postImage={getImageUrl(post.postImage)}
                  comments={parseInt(post.comments) || 0}
                  retweets={parseInt(post.repost) || 0}
                  likes={parseInt(post.likes) || 0}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3 w-full mt-6 lg:mt-12">
        <SearchCommunity title='Trending Post' />
      </div>
    </div>
  );
};

export default Highlight;
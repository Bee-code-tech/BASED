'use client'
import React, { useState } from 'react';
import { Input } from './ui/input';
import { FiSearch, FiAlertCircle } from 'react-icons/fi'; 
import { BsThreeDots } from 'react-icons/bs';

interface SearchCommunityProps {
  title: string; 
}

const SearchCommunity: React.FC<SearchCommunityProps> = ({ title }) => {
  // Dummy data for the trending posts
  const posts = [
    { category: 'Tech', hashtag: '#React', postCount: '15K' },
    { category: 'Tech', hashtag: '#TailwindCSS', postCount: '12K' },
    { category: 'JavaScript', hashtag: '#JavaScript', postCount: '18K' },
    { category: 'TypeScript', hashtag: '#TypeScript', postCount: '9K' },
    { category: 'WebDev', hashtag: '#WebDev', postCount: '11K' },
    { category: 'Python', hashtag: '#Python', postCount: '20K' },
    { category: 'AI', hashtag: '#ArtificialIntelligence', postCount: '25K' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Handle search input
  const filteredPosts = posts.filter(post =>
    post.hashtag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit to 5 posts, unless "Show more" is clicked
  const displayedPosts = showMore ? filteredPosts : filteredPosts.slice(0, 5);

  return (
    <div className="px-4">
      {/* Search Input */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
          <FiSearch size={20} /> {/* Search Icon */}
        </span>
        <Input
          placeholder="Search communities..."
          className="w-full rounded-full p-4 h-12 pl-12 text-md" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Trending Posts Box */}
      <div className="bg-white border border-neutral-300 rounded-2xl p-6 min-h-[300px] flex flex-col justify-center items-center">
        {/* If no search results */}
        {filteredPosts.length === 0 && searchTerm !== '' && (
          <div className="flex flex-col items-center justify-center text-center">
            <FiAlertCircle size={50} className="text-gray-400 mb-4" /> {/* Empty Icon */}
            <p className="text-gray-500 text-lg">No search results found</p>
          </div>
        )}

        {/* Display Posts if there are results */}
        {filteredPosts.length > 0 && (
          <>
          <div className="w-full flex items-start">
            <h2 className="text-xl font-semibold mb-4 text-left">{title}</h2>

          </div>
            <ul className="space-y-4 w-full">
              {displayedPosts.map((post, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start  pb-3 "
                >
                  <div className="flex flex-col gap-1 ">
                    <span className="text-sm text-neutral-500">1 • {post.category}</span> {/* Replaced ~ with • */}
                    <span className="text-black font-bold">{post.hashtag}</span> 
                    <span className="text-neutral-600 text-sm">{post.postCount} posts</span> 
                  </div>
                  <BsThreeDots className="text-gray-500 cursor-pointer" /> 
                </li>
              ))}
            </ul>

            {/* Show more / Show less */}
            {filteredPosts.length > 5 && (
              <div className="text-primaryColor mt-4 cursor-pointer flex items-start w-full" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show less' : 'Show more'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchCommunity;

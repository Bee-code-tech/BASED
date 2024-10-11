'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react'; // Import the close icon
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Button } from './ui/button';

const CreatePostModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Animation state to control zoom in and out
  const [isClosing, setIsClosing] = useState(false);

  // State for the selected community and post content
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [postContent, setPostContent] = useState('');

  // Close modal with animation
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Duration should match the animation duration
  };

  // Close modal when clicking outside of it
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Community:', selectedCommunity);
    console.log('Post Content:', postContent);
  };

  // Prevent the modal from closing when interacting with the select dropdown
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}>
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button onClick={closeModal} className="absolute top-4 right-4">
          <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>

        {/* Select Community */}
        <div className="mb-4">
          <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">Select Community</label>
          <Select onValueChange={(value) => setSelectedCommunity(value)}>
            <SelectTrigger className="w-full" onMouseDown={handleMouseDown}>
              <SelectValue placeholder="All Communities" />
            </SelectTrigger>
            <SelectContent onMouseDown={handleMouseDown}>
              <SelectItem value="Based Africa">Based Africa</SelectItem>
              <SelectItem value="Based Kenya">Based Kenya</SelectItem>
              <SelectItem value="Based India">Based India</SelectItem>
              <SelectItem value="Based Gbogboe">Based Gbogboe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Post Content */}
        <textarea
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
          rows={5}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        {/* Create Post Button */}
        <Button onClick={handleSubmit} className="bg-primaryColor text-white w-full">
          Create Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostModal;

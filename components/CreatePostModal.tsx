import React, { useEffect, useRef } from 'react';

const CreatePostModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        {/* Modal content goes here */}
        <textarea
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded-lg p-4 mb-4"
          rows={5}
        />
        <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;

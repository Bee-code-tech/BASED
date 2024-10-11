import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { FaRegComment, FaRetweet, FaRegHeart } from 'react-icons/fa'; 
import { FiShare } from 'react-icons/fi';

// Define the Post component
const Post: React.FC<{
  profilePic?: string | StaticImageData; 
  name: string;
  tagName: string;
  timePosted: string;
  postText: string;
  postImage?: string | StaticImageData; 
  comments: number;
  retweets: number;
  likes: number;
  title?: string
}> = ({
  profilePic,
  name,
  tagName,
  timePosted,
  postText,
  postImage,
  comments,
  retweets,
  likes,
  title
}) => {
  // Fallback for profile picture if undefined
  const defaultProfilePic = 'https://via.placeholder.com/150'; // Default placeholder image

  return (
    <div className="border-b border-gray-300 p-4">
      <h1 className='mb-8 font-bold text-2xl'>{title} </h1>
      <div className="flex items-start">
        {/* Profile Picture */}
        <Image
          src={profilePic || defaultProfilePic} // Use default image if profilePic is undefined
          alt={name}
          width={48} 
          height={48}
          className="rounded-full mr-4"
        />

        <div className="flex-1">
          {/* User Name, Tag, and Time */}
          <div className="flex items-center space-x-2">
            <h4 className="font-bold">{name}</h4>
            <span className="text-gray-500">@{tagName} · {timePosted}</span>
          </div>

          {/* Post Text */}
          <p className="mt-2 text-gray-800 mb-4">{postText}</p>

          {/* Post Image (optional) */}
          {postImage && (
            <Image
              src={postImage}
              alt="Post"
              width={600} 
              height={300}
              className="my-2 rounded-lg w-full object-cover"
            />
          )}

          {/* Interaction Icons */}
          <div className="flex justify-start items-start text-gray-500 mt-4 w-auto gap-8">
             {/* Like Icon and Count */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500 flex-col">
              <FaRegHeart className="w-5 h-5 mb-2" />
              <span>{likes} likes</span>
            </div>
            {/* Comment Icon and Count */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 flex-col">
              <FaRegComment className="w-5 h-5 mb-2" />
              <span>{comments} replies</span>
            </div>

            {/* Retweet Icon and Count */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500 flex-col">
              <FaRetweet className="w-5 h-5 mb-2" />
              <span>{retweets} reposts</span>
            </div>

           

            {/* Share Icon */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700 flex-col">
              <FiShare className="w-5 h-5 mb-2" />
            </div>
          </div>

          <div className="flex gap-2 border rounded-2xl items-start ml-10 my-6 p-4">
             <Image
                src={profilePic || defaultProfilePic} 
                alt={name}
                width={48} 
                height={48}
                className="rounded-full mr-4"
              />
            <div className="flex-1">
                 {/* User Name, Tag, and Time */}
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold">{name}</h4>
                    <span className="text-gray-500">@{tagName} · {timePosted}</span>
                  </div>

                  {/* Post Text */}
                  <p className="mt-2 text-gray-800">{postText}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

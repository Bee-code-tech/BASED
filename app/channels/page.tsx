import Post from '@/components/Posts'
import SearchCommunity from '@/components/SearchCommunity'
import { postData, team } from '@/data'
import React from 'react'

const Channels = () => {
  return (
      <div className=' grid grid-cols-10 items-start justify-center  min-h-screen container mx-auto gap-6'>
      <div className="col-span-7  h-full w-full flex items-end justify-end pr-10  ">
        <div className="max-w-4xl  ">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 border border-neutral-300 border-b-transparent border-r border-l border-t-transparent pt-12">
          {team.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="bg-neutral-50 p-6 rounded-2xl border-neutral-300 border"
            >
              {/* Profile and Name Row */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img src={member.profilePic} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.total} members</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">
                {member.description}
              </p>

              {/* Request to Join / Joined Button */}
              <button
                className={`w-auto py-2 px-4 rounded-xl ${
                  member.joined
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-transparent border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition duration-300 ease-out'
                }`}
                disabled={member.joined}
              >
                {member.joined ? 'Joined' : 'Request to Join'}
              </button>
            </div>
          ))}
        </div>
      {/* Map over the postData array to render each post */}
      {postData.map((post, index) => (
        <div className="border border-t-transparent border-b-transparent items-end " key={index}>
          <Post
          title=''
          profilePic={post.profilePic}
          name={post.name}
          tagName={post.tagName}
          timePosted={post.timePosted}
          postText={post.postText}
          postImage={post.postImage}
          comments={post.comments}
          retweets={post.retweets}
          likes={post.likes}
        />
        </div>
      ))}
    </div>
      </div>
      <div className="col-span-3  h-full w-full mt-12">
        <SearchCommunity title='Trending Post' />
      </div>
    </div>
  )
}

export default Channels
import Post from '@/components/Posts'
import SearchCommunity from '@/components/SearchCommunity'
import { postData } from '@/data'
import React from 'react'

const Highlight = () => {
  return (
      <div className=' grid grid-cols-10 items-start justify-center  min-h-screen container mx-auto gap-6'>
      <div className="col-span-7  h-full w-full flex items-end justify-end pr-10  ">
        <div className="max-w-4xl  ">
      {/* Map over the postData array to render each post */}
      {postData.map((post, index) => (
        <div className="border border-t-transparent border-b-transparent items-end " key={index}>
          <Post
          title='Post'
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

export default Highlight
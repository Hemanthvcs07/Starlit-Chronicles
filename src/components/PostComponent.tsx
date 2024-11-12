import React from 'react';
import Image from 'next/image';
import { postData } from './postData'; // Import post data from the separate file
import  Post from '../Interface/postTypes'; // Import the Post interface

const PostComponent = () => {
  // Find the post with the highest number of shares
  const topPost = postData.reduce((prev: Post, current: Post) => {
    return (prev.shares > current.shares) ? prev : current;
  });

  return (
    <div className="container mx-auto p-6">
      {/* Post Title */}
      <h1 className="text-4xl font-bold text-center mb-4">{topPost.title}</h1>
      
      {/* Post Image */}
      <div className="relative w-full h-72 mb-6">
        <Image
          src={topPost.image}
          alt={topPost.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Post Content */}
      <p className="text-lg text-gray-700 leading-relaxed">{topPost.content}</p>
    </div>
  );
};

export default PostComponent;

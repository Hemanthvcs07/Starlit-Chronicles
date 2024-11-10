// PostComponent.js
import React from 'react';
import Image from 'next/image';
import { postData } from './postData'; // Import post data from the separate file

const PostComponent = () => {
  const post = postData[0]; // Use the first post as the main post

  return (
    <div className="container mx-auto p-6">
      {/* Post Title */}
      <h1 className="text-4xl font-bold text-center mb-4">{post.title}</h1>
      
      {/* Post Image */}
      <div className="relative w-full h-72 mb-6">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Post Content */}
      <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
    </div>
  );
};

export default PostComponent;

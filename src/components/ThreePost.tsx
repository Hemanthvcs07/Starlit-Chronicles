// ThreeColumnLayout.js
import React from 'react';
import Image from 'next/image';
import { postData } from './postData'; // Import the post data

const ThreeColumnLayout = () => {
  const topPosts = postData.slice(0, 3); // Select the top 3 posts

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Top 3 Posts</h2>
      
      {/* Three Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image */}
            <div className="w-full h-48 relative">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            {/* Card Content: Title and Description */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeColumnLayout;

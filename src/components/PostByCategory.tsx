'use client'; // This marks the component as a client-side component

import React, { useState } from 'react';
import Image from 'next/image';
import { postData } from './postData'; // Import the post data
import Post from '../Interface/postTypes'

const CategoryPostComponent: React.FC = () => {
  // Get unique categories from the post data
  const categories = Array.from(new Set(postData.flatMap((post: Post) => post.categories)));

  // State to track the selected category (Initially the first category)
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  // Filter posts based on the selected category
  const filteredPosts = postData.filter((post: Post) => post.categories.includes(selectedCategory));

  return (
    <div className="container mx-auto p-6">
      {/* Category Links */}
      <div className="mb-6">
        <ul className="flex space-x-4 overflow-x-auto pb-4">
          {categories.map((category: string) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer py-2 px-6 rounded-full text-lg font-semibold transition-all duration-300 ${
                category === selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
              } hover:bg-blue-500 hover:text-white`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Posts Based on Selected Category */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: Post) => (
          <div key={post.id} className={`relative rounded-lg overflow-hidden shadow-lg ${post.background}`}>
            <div className="relative w-full h-64">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-800 text-base">{post.content.substring(0, 150)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPostComponent;

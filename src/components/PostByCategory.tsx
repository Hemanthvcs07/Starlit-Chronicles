"use client"; // This marks the component as a client-side component

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { postData } from "./postData"; // Import the post data
import { Post } from "../Interface/postTypes";

const CategoryPostComponent: React.FC = () => {
  // Get unique categories from the post data
  const categories = Array.from(
    new Set(postData.flatMap((post: Post) => post.categories))
  );

  // State to track the selected category (Initially the first category)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  // Filter posts based on the selected category
  const filteredPosts = postData.filter((post: Post) =>
    post.categories.includes(selectedCategory)
  );

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
                category === selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-500 hover:text-white`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Posts Based on Selected Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPosts.map((post: Post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {post.content.substring(0, 100)}...
              </p>
              <Link
                href={`/posts/${post.categories[0].toLowerCase()}/${post.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPostComponent;

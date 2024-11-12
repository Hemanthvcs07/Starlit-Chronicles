import React from "react";
import Image from "next/image";
import Link from "next/link";
import { postData } from "@/components/postData";

const ThreeColumnLayout = () => {
  const topPosts = postData.slice(0, 3); // Select the top 3 posts

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Top 3 Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="w-full h-48 relative">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-700">
                {post.content.slice(0, 100)}...
              </p>

              <Link
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
                href={`/posts/${post.categories[0].toLowerCase()}/${post.slug}`} 
              >
                Continue Reading
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeColumnLayout;

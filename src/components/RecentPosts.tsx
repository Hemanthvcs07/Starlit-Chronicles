import React from 'react';
import { postData } from '@/components/postData';
import { Post } from '@/Interface/postTypes';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

const BlogRecentPosts: React.FC = () => {
  // Sort posts by date to get the most recent ones
  const recentPosts = postData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Heading and Optional Content */}
        <div className="flex flex-col justify-center items-center space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6">Recent Posts</h2>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <p className="text-lg text-gray-500">
              Additional content can be placed here, such as advertisements or widgets.
            </p>
          </div>
        </div>

        {/* Right Column: Recent Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {recentPosts.map((post: Post) => {
            const timeAgo = formatDistanceToNow(new Date(post.date), { addSuffix: true });

            return (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl flex flex-col h-full"
              >
                {/* Image with larger height */}
                <div className="relative h-44">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-60 text-white text-xs rounded-tr-lg rounded-bl-lg">
                    {timeAgo}
                  </div>
                </div>

                {/* Content Area with increased padding */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                      {post.title.length > 40 ? `${post.title.slice(0, 40)}...` : post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {post.metaDescription.length > 60 ? `${post.metaDescription.slice(0, 60)}...` : post.metaDescription}
                    </p>
                  </div>
                  <a
                    href={`/posts/${post.categories[0].toLowerCase()}/${post.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-400 mt-4 inline-block"
                  >
                    Keep Reading →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogRecentPosts;

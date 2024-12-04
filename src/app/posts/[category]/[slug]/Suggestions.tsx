'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Post } from '../../../../types/types';

// Deduplicate posts by `_id`
function deduplicatePosts(posts: Post[]): Post[] {
  const seen = new Set();
  return posts.filter((post) => {
    if (seen.has(post._id)) return false;
    seen.add(post._id);
    return true;
  });
}

const Suggestions = ({
  seriesSuggestions,
  otherSuggestions,
}: {
  seriesSuggestions: Post[];
  otherSuggestions: Post[];
}) => {
  const router = useRouter();

  const handleClick = (post: Post) => {
    router.push(`/posts/${post.categories}/${post.slug}`);
  };

  const renderSuggestions = (posts: Post[], context: string) =>
    posts.map((post) => (
      <div
        key={`${post._id}-${context}`} // Ensure unique keys by adding context
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
        onClick={() => handleClick(post)}
      >
        <div className="relative h-48">
          {post.images.length > 0 && (
            <Image
              src={post.images[0]}
              alt={post.title}
              layout="fill"
              className="object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">{post.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-3">{post.content.slice(0, 150)}...</p>
        </div>
      </div>
    ));

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 mt-20">
      {/* Series Suggestions */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-white mb-6">Series Recommendations</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderSuggestions(deduplicatePosts(seriesSuggestions), 'series')}
        </div>
      </div>

      {/* Other Suggestions */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-6">Other Recommendations</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderSuggestions(deduplicatePosts(otherSuggestions), 'non-series')}
        </div>
      </div>
    </section>
  );
};

export default Suggestions;

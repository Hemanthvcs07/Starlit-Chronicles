import React from 'react';
import Image from 'next/image';
import { Post } from '../../../../types/types';

const PostContent = ({ post }: { post: Post }) => (
  <div className="max-w-4xl mx-auto px-6 lg:px-16 py-12 bg-gray-800 rounded-lg text-gray-200 space-y-10">
    <h1 className="text-4xl lg:text-6xl font-bold">{post.title}</h1>
    {post.categories === 'series' && (
      <p className="text-lg text-gray-400 mb-6">
        <span className="font-semibold">{post.seriesName}</span> - Episode {post.episodeNumber} of {post.totalEpisodes}
      </p>
    )}
    <div className="text-lg text-gray-400 mb-6">
      <span className="font-semibold">By {post.author}</span> • <span>{new Date(post.datePosted).toLocaleDateString()}</span> •{' '}
      <span>{post.readingTime} min read</span>
    </div>
    {post.images.map((img, idx) => (
      <div key={idx} className="w-full h-[350px] sm:h-[450px] lg:h-[550px] relative rounded-lg overflow-hidden">
        <Image src={img} alt={`Post Image ${idx + 1}`} layout="fill" className="object-cover" />
      </div>
    ))}
    <div
      className="prose prose-invert prose-lg lg:prose-xl mx-auto"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  </div>
);

export default PostContent;

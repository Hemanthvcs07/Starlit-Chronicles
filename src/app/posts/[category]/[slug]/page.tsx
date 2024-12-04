import React from 'react';
import { Metadata } from 'next';
import PostContent from './PostContent';
import Suggestions from './Suggestions';
import { fetchPost, fetchSuggestions } from '../../../../lib/api';

export const dynamic = 'force-dynamic'; // Ensure always dynamic for SSR
export const revalidate = 60; // Incremental static regeneration every 60 seconds

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const { category, slug } = params;
  const post = await fetchPost(category, slug);

  return {
    title: post?.title || 'Post Not Found',
    description: post?.content.slice(0, 160) || '',
  };
}

export default async function PostPage({ params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params;

  try {
    const post = await fetchPost(category, slug);
    const { seriesSuggestions, otherSuggestions } = await fetchSuggestions(category, post);

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <PostContent post={post} />
        </div>
        <Suggestions seriesSuggestions={seriesSuggestions} otherSuggestions={otherSuggestions} />
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Post Not Found</h1>
          <p className="text-gray-400 mt-4">
            The requested post does not exist or an error occurred. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}

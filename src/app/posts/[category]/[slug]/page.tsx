'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  categories: string;
  tags: string[];
  images: string[];
  readingTime: number;
  isFeatured: boolean;
  seriesName?: string;
  episodeNumber?: number;
  totalEpisodes?: number;
  datePosted: string;
}

const PostPage = () => {
  const params = useParams();
  const category = params.category as string;
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Post[]>([]);

  const fetchPostAndSuggestions = useCallback(async (category: string, slug: string) => {
    try {
      // Fetch the specific post by category and slug
      const response = await fetch(`/api/posts/${category}/${slug}`);
      if (!response.ok) throw new Error(`Failed to fetch post: ${response.statusText}`);

      const { post: fetchedPost, error } = await response.json();
      if (error) throw new Error(error);

      setPost(fetchedPost);

      // Fetch categorized posts to generate suggestions
      const allPostsResponse = await fetch('/api/posts');
      const { featuredPosts, seriesPosts, travelPosts, musicPosts, photographyPosts } = await allPostsResponse.json();
      console.log({ featuredPosts, seriesPosts, travelPosts, musicPosts, photographyPosts });

      // Filter out suggestions based on categories
      let filteredSuggestions: Post[] = [];

      // Example logic to choose suggestions based on current post's category
      if (fetchedPost.categories === 'series') {
        filteredSuggestions = seriesPosts.filter(post => post.slug !== fetchedPost.slug);
      } else if (fetchedPost.categories === 'travel') {
        filteredSuggestions = travelPosts.filter(post => post.slug !== fetchedPost.slug);
      } else if (fetchedPost.categories === 'music') {
        filteredSuggestions = musicPosts.filter(post => post.slug !== fetchedPost.slug);
      } else if (fetchedPost.categories === 'photography') {
        filteredSuggestions = photographyPosts.filter(post => post.slug !== fetchedPost.slug);
      } else {
        filteredSuggestions = featuredPosts.filter(post => post.slug !== fetchedPost.slug);
      }

      setSuggestions(filteredSuggestions);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while fetching the post.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (category && slug) {
      fetchPostAndSuggestions(category, slug);
    }
  }, [category, slug, fetchPostAndSuggestions]);

  if (loading) {
    return <div className="text-center py-8 text-lg text-gray-500 animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-lg text-red-600">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-8 text-lg text-gray-500">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      {post.images.length > 0 && (
        <div className="relative w-full h-[75vh]">
          <Image
            src={post.images[0]}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 lg:px-0">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mt-4 text-lg lg:text-xl text-gray-300">
              <span>By <strong>{post.author}</strong></span>
              <span>{new Date(post.datePosted).toLocaleDateString()}</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      )}

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 bg-gray-800 shadow-lg rounded-lg mt-8 relative z-10">
        {post.categories === 'series' && (
          <p className="text-lg text-gray-400 mb-6">
            <span className="font-semibold">{post.seriesName}</span> - Episode {post.episodeNumber} of {post.totalEpisodes}
          </p>
        )}
        <div
          className="prose prose-invert prose-lg lg:prose-xl text-gray-100 mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags Section */}
        {post.tags.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm text-blue-300 bg-blue-900 rounded-full shadow hover:bg-blue-800 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 py-16 mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            {post.categories === 'series' ? 'Next Episodes' : 'You Might Also Like'}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestedPost) => (
              <div
                key={suggestedPost._id}
                className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  {suggestedPost.images.length > 0 && (
                    <Image
                      src={suggestedPost.images[0]}
                      alt={suggestedPost.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-200 mb-4">
                    {suggestedPost.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {suggestedPost.content.slice(0, 150)}...
                  </p>
                  <a
                    href={`/posts/${suggestedPost.categories}/${suggestedPost.slug}`}
                    className="block mt-4 text-blue-300 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;

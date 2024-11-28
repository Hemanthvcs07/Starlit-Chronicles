'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

type Post = {
  title: string;
  slug: string;
  author: string;
  datePosted: string;
  readingTime: number;
  categories: string[];
  seriesName?: string;
  episodeNumber?: number;
  totalEpisodes?: number;
  images?: string[];
};

const CategoryPosts = () => {
  const pathname = usePathname();
  const category = pathname.split('/')[2];  // Gets the category from the URL
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetch(`/api/posts/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [category]);

  if (loading) return <div className="text-center text-lg mt-8">Loading...</div>;

  // Group posts by seriesName, 'standalone' for posts without a series
  const groupedPosts = posts.reduce((acc: Record<string, Post[]>, post) => {
    const key = post.seriesName || 'standalone';
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});

  // Separate series posts from standalone posts
  const seriesPosts = Object.entries(groupedPosts).filter(([seriesName]) => seriesName !== 'standalone');
  const standalonePosts = groupedPosts.standalone || [];

  const handleSeriesClick = (seriesName: string) => {
    router.push(`/posts/${category}/${seriesName}`);
  };

  const handlePostClick = (slug: string) => {
    router.push(`/posts/${category}/${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">Posts in {category}</h1>

      {/* Display Series Posts */}
      {seriesPosts.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Series</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {seriesPosts.map(([seriesName, posts]) => {
              // Sort episodes by episodeNumber and take the first episode (lowest number)
              const firstEpisode = posts.sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0))[0];

              return (
                <div
                  key={seriesName}
                  className="group relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => handleSeriesClick(seriesName)}
                >
                  {/* Series Card Image */}
                  <div className="relative w-full h-64">
                    {firstEpisode.images?.length ? (
                      <Image
                        src={firstEpisode.images[0]}
                        alt={seriesName}
                        layout="fill"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-lg font-semibold text-white truncate">{seriesName}</h3>
                    <p className="text-sm text-gray-300">{firstEpisode.totalEpisodes} Episodes</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Display Standalone Posts */}
      {standalonePosts.length > 0 && (
        <div className="space-y-8 mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Other Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {standalonePosts.map((post) => (
              <div
                key={post.slug}
                className="group relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Card Image */}
                <div className="relative w-full h-64">
                  {post.images?.length ? (
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      layout="fill"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-lg font-semibold text-white truncate">{post.title}</h3>
                  <p className="text-sm text-gray-400">{post.readingTime} min read</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPosts;

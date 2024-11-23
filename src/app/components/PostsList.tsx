"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getFeaturedPosts,
  filterByCategory,
  organizeSeries,
  sortByDate,
} from "../../helpers/postHelper";
import Link from "next/link";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [seriesPosts, setSeriesPosts] = useState({});
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();

        const sortedPosts = sortByDate(data.posts);
        setPosts(sortedPosts);
        setFeaturedPosts(getFeaturedPosts(sortedPosts));
        setSeriesPosts(organizeSeries(sortedPosts));

        const categoryGroups = {};
        sortedPosts.forEach((post) => {
          const category = post.categories || "Uncategorized";
          if (!categoryGroups[category]) {
            categoryGroups[category] = [];
          }
          categoryGroups[category].push(post);
        });
        setCategories(categoryGroups);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const postsToRender = selectedCategory
    ? filterByCategory(posts.filter((post) => post.categories !== "series"), selectedCategory)
    : posts.filter((post) => post.categories !== "series");

  // Card for Featured Posts
  const renderFeaturedCard = (post) => (
    <Link key={post._id} href={`/posts/${post.categories}/${post.slug}`} passHref>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white shadow-lg p-4 sm:p-6 md:p-8 flex flex-col justify-between h-64 hover:scale-105 transition-transform duration-300 cursor-pointer">
        <h3 className="text-xl md:text-2xl font-bold truncate">{post.title}</h3>
        <p className="mt-2 text-sm md:text-base line-clamp-3">
          {post.content.slice(0, 100)}...
        </p>
        <p className="mt-4 text-xs md:text-sm">By {post.author}</p>
      </div>
    </Link>
  );

  // Card for All Posts
  const renderGeneralCard = (post) => (
    <Link key={post._id} href={`/posts/${post.categories}/${post.slug}`} passHref>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer group">
        <div className="relative w-full h-52">
          {post.images?.length > 0 ? (
            <Image
              src={post.images[0]}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-500">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600">{post.author}</p>
        </div>
      </div>
    </Link>
  );

  // Card for Series Posts
  const renderSeriesCard = (post) => (
    <Link key={post._id} href={`/posts/${post.categories}/${post.slug}`} passHref>
      <div className="relative rounded-lg overflow-hidden shadow-md group h-64">
        {post.images?.length > 0 && (
          <Image
            src={post.images[0]}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-60 transition duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-sm">{post.author}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900">
        Discover Amazing Content
      </h1>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">🌟 Featured Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredPosts.map(renderFeaturedCard)}
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {selectedCategory ? `${selectedCategory} Posts` : "All Posts"}
        </h2>
        <div className="mb-6">
          <label className="mr-4 font-semibold">Filter by Category:</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {Object.keys(categories)
              .filter((category) => category !== "series")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {postsToRender.map(renderGeneralCard)}
        </div>
      </section>

      {/* Series Posts Section */}
      {Object.keys(seriesPosts).length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">📚 Series Posts</h2>
          {Object.keys(seriesPosts).map((seriesName) => (
            <div key={seriesName} className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">{seriesName}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {seriesPosts[seriesName].map(renderSeriesCard)}
              </div>
            </div>
          ))}
        </section>
      )}

      <footer className="mt-16 py-6 bg-gray-100 text-center text-gray-600 rounded-md">
        <p>© 2024 Your Blog Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PostsList;

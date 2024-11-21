"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
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
        setPosts(data.posts);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Blog Posts
      </h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">by {post.author}</p>
              <p className="text-gray-700 truncate">{post.content}</p>
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="mt-4 rounded-md"
                />
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {post.categories?.join(", ") || "Uncategorized"}
                </p>
                <p className="text-sm text-gray-500">
                  Tags: {post.tags?.join(", ") || "No tags"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsList;

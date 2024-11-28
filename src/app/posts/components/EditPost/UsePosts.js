// src/hooks/usePosts.js
import { useState, useEffect } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        const allPosts = [
          ...data.featuredPosts,
          ...data.seriesPosts,
          ...data.travelPosts,
          ...data.musicPosts,
          ...data.photographyPosts,
        ];
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return {
    posts,
    filteredPosts,
    searchTerm,
    setSearchTerm,
    setPosts,
  };
};

export default usePosts;

import React, { useState } from "react";
import usePosts from "./UsePosts";
import PostCard from "./PostCard";
import EditPostModal from "./EditPostModal";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const PostsList = () => {
  const { filteredPosts, searchTerm, setSearchTerm, setPosts } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const openEditModal = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setCurrentPost((prev) => ({ ...prev, [name]: checked }));
  };

  const updatePost = async () => {
    if (!currentPost) return;

    // Optimistic update: update the post immediately in the UI
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === currentPost._id ? { ...post, ...currentPost } : post
      )
    );

    try {
      const response = await fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPost),
      });

      if (response.ok) {
        alert("Post updated successfully!");
        closeModal();
      } else {
        alert("Failed to update the post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating the post");
      // Optionally, revert the optimistic update if the API fails
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === currentPost._id ? { ...post, ...currentPost } : post
        )
      );
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
        alert("Post deleted successfully!");
      } else {
        console.error("Error deleting post:", response.statusText);
        alert("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting the post");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg space-y-6">
      {/* Search Bar */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Posts List - Fixed Height with Scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-h-[670px] overflow-y-auto">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={`${post._id}-${post.episodeNumber || post.title || post.createdAt}-${Math.random()}`}
              post={post}
              onEdit={openEditModal}
              onDelete={deletePost}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No posts found.</p>
        )}
      </div>

      {/* Edit Post Modal */}
      <EditPostModal
        isOpen={isModalOpen}
        post={currentPost}
        onClose={closeModal}
        onUpdate={updatePost}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        handleToggle={handleToggle} 
      />
    </div>
  );
};

export default PostsList;

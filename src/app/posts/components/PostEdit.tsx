import React, { useState, useEffect } from "react";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        console.log("Fetched posts:", data);

        // Combine all posts into one array
        const allPosts = [
          ...data.featuredPosts,
          ...data.seriesPosts,
          ...data.travelPosts,
          ...data.musicPosts,
          ...data.photographyPosts,
        ];

        setPosts(allPosts); // Store all posts in a single array
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Default to an empty array on error
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the search term
  useEffect(() => {
    if (!Array.isArray(posts)) return; // Safeguard against invalid data

    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(term))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

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
    setCurrentPost((prev) => ({ ...prev, [name]: value.split(",").map((item) => item.trim()) }));
  };

  const updatePost = async () => {
    if (!currentPost) return;
    try {
      const response = await fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPost),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
        alert("Post updated successfully!");
        closeModal();
      } else {
        alert("Failed to update the post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating the post");
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
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search posts by title, author, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={`${post._id}-${post.episodeNumber || post.title || post.createdAt}-${Math.random()}`}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-md flex items-start justify-between"
            >
              {/* Post Details */}
              <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
                <p className="text-sm text-gray-600">Author: {post.author}</p>
                <p className="text-sm text-gray-600">
                  Tags: {post.tags?.join(", ") || "None"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => openEditModal(post)}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>

      {/* Edit Post Modal */}
      {isModalOpen && currentPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Post</h3>
            {/* Form Fields */}
            <input
              type="text"
              name="title"
              value={currentPost.title}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Post Title"
            />
            <input
              type="text"
              name="author"
              value={currentPost.author}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Author"
            />
            <textarea
              name="content"
              value={currentPost.content}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Content"
            />
            <input
              type="text"
              name="tags"
              value={currentPost.tags?.join(", ")}
              onChange={handleArrayChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Tags (comma separated)"
            />
            <input
              type="text"
              name="images"
              value={currentPost.images?.join(", ")}
              onChange={handleArrayChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Image URLs (comma separated)"
            />
            <input
              type="text"
              name="categories"
              value={currentPost.categories}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Category"
            />

            {/* Series Specific Fields */}
            {currentPost.categories === "series" && (
              <>
                <input
                  type="text"
                  name="seriesName"
                  value={currentPost.seriesName}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder="Series Name"
                />
                <input
                  type="number"
                  name="episodeNumber"
                  value={currentPost.episodeNumber || ""}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder="Episode Number"
                />
                <input
                  type="number"
                  name="totalEpisodes"
                  value={currentPost.totalEpisodes || ""}
                  onChange={handleInputChange}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder="Total Episodes"
                />
              </>
            )}

            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={updatePost}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;

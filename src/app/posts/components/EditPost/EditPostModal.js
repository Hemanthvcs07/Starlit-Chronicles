import React from "react";

const EditPostModal = ({ isOpen, post, onClose, onUpdate, handleInputChange, handleArrayChange, handleToggle }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Post</h3>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="text-gray-600">Post Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              id="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Enter post title"
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <label htmlFor="author" className="text-gray-600">Author</label>
            <input
              type="text"
              name="author"
              value={post.author}
              onChange={handleInputChange}
              id="author"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Author name"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="categories" className="text-gray-600">Category</label>
            <input
              type="text"
              name="categories"
              value={post.categories}
              onChange={handleInputChange}
              id="categories"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Enter category"
            />
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="tags" className="text-gray-600">Tags</label>
            <input
              type="text"
              name="tags"
              value={post.tags?.join(", ")}
              onChange={handleArrayChange}
              id="tags"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Enter tags, separated by commas"
            />
          </div>

          {/* Images */}
          <div className="form-group">
            <label htmlFor="images" className="text-gray-600">Image URLs</label>
            <input
              type="text"
              name="images"
              value={post.images?.join(", ")}
              onChange={handleArrayChange}
              id="images"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Enter image URLs, separated by commas"
            />
          </div>

          {/* Is Featured */}
          <div className="form-group col-span-1 sm:col-span-2 lg:col-span-3">
            <label htmlFor="isFeatured" className="text-gray-600">Featured</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={post.isFeatured}
                onChange={handleToggle}
                id="isFeatured"
                className="h-6 w-6 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">Mark as featured</span>
            </div>
          </div>

          {/* Series Specific Fields */}
          {post.categories === "series" && (
            <>
              <div className="form-group">
                <label htmlFor="seriesName" className="text-gray-600">Series Name</label>
                <input
                  type="text"
                  name="seriesName"
                  value={post.seriesName || ""}
                  onChange={handleInputChange}
                  id="seriesName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  placeholder="Enter series name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="episodeNumber" className="text-gray-600">Episode Number</label>
                <input
                  type="number"
                  name="episodeNumber"
                  value={post.episodeNumber || ""}
                  onChange={handleInputChange}
                  id="episodeNumber"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  placeholder="Enter episode number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalEpisodes" className="text-gray-600">Total Episodes</label>
                <input
                  type="number"
                  name="totalEpisodes"
                  value={post.totalEpisodes || ""}
                  onChange={handleInputChange}
                  id="totalEpisodes"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  placeholder="Enter total episodes"
                />
              </div>
            </>
          )}

          {/* Content */}
          <div className="form-group col-span-1 sm:col-span-2 md:col-span-3">
            <label htmlFor="content" className="text-gray-600">Content</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
              id="content"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              placeholder="Write the content here..."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;

import React, { useState } from "react";
import { HiDotsHorizontal, HiPencilAlt, HiTrash } from "react-icons/hi"; // Corrected import for ellipsis icon

const PostCard = ({ post, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-xl overflow-hidden hover:scale-105 transform transition-all duration-300">
      {/* Image Background with overlay */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${post.images[0]})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Title and Author Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="text-white space-y-2">
            <h2 className="text-3xl font-semibold">{post.title}</h2>
            <p className="text-lg">{post.author}</p>
          </div>
        </div>
      </div>

      {/* Action Button for Edit/Delete */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleMenuToggle}
          className="text-white hover:text-yellow-400 transition-colors"
        >
          <HiDotsHorizontal size={24} />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <button
              onClick={() => onEdit(post)}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center"
            >
              <HiPencilAlt size={18} className="inline mr-2" />
              Edit
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center"
            >
              <HiTrash size={18} className="inline mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search posts by title, author, or tags..."
        value={value}
        onChange={onChange}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
      />
    </div>
  );
};

export default SearchBar;

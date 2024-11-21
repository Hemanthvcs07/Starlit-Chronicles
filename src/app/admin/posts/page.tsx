'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setError("Title, content, and author are required.");
      return;
    }

    const postData = { title, content, author, categories, tags, image, published };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
        return;
      }

      const data = await response.json();
      setSuccess(data.message);
      router.push("/admin/posts");
    } catch (err) {
      setError("Failed to create post.");
      console.error(err);
    }
  };

  const fillMockData = () => {
    setTitle("Sample Post Title");
    setContent(
      "This is a sample post content. It can be a bit longer, but should not exceed 2000 characters."
    );
    setAuthor("John Doe");
    setCategories(["Technology", "React"]);
    setTags(["Web Development", "Programming"]);
    setImage("https://i.pinimg.com/736x/7b/c8/65/7bc8653fdb5f3306073ede609c787773.jpg");
    setPublished(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Create a New Post
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700"
            >
              Categories:
            </label>
            <input
              type="text"
              id="categories"
              value={categories.join(",")}
              onChange={(e) => setCategories(e.target.value.split(","))}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(","))}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="published"
              className="block text-sm font-medium text-gray-700"
            >
              Published:
            </label>
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              minLength={50}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={5}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {image && (
            <div className="mt-4">
              <Image
                src={image}
                alt="Post Image Preview"
                width={300}
                height={200}
                className="rounded-md"
              />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Post
          </button>
          <button
            onClick={fillMockData}
            type="button"
            className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Fill Mock Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
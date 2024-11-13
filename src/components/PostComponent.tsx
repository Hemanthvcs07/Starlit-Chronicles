// components/HighestLikedPost.tsx
import { FC } from "react";
import { postData } from "@/components/postData"; // Import the mock data
import { Post } from "@/Interface/postTypes"; // Import the Post interface
import { StaticImageData } from "next/image";

const HighestLikedPost: FC = () => {
  // Fix the reduce function type here
  const highestLikedPost = postData.reduce<Post>((prev, current) => {
    return prev.shares > current.shares ? prev : current;
  }, postData[0]); // Providing the first post as the initial value

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
      {/* Handle image based on type */}
      <div
        className="bg-cover bg-center h-64 rounded-lg"
        style={{
          backgroundImage: typeof highestLikedPost.image === "string" 
            ? `url(${highestLikedPost.image})` 
            : `url(${(highestLikedPost.image as StaticImageData).src})`, // Correctly access src if image is StaticImageData
        }}
      />
      
      <div
        className="p-6 bg-gray-50"
        style={{ backgroundColor: highestLikedPost.background }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{highestLikedPost.title}</h2>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">{highestLikedPost.author}</span> |{" "}
          <span>{highestLikedPost.date}</span> |{" "}
          <span>{highestLikedPost.readingTime}</span>
        </p>
        <p className="text-gray-700 mb-4">{highestLikedPost.metaDescription}</p>
        <div className="flex flex-wrap space-x-3 mb-4">
          {highestLikedPost.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-200 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        <p className="text-gray-600">{highestLikedPost.content.slice(0, 200)}...</p>
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-500 text-sm">{highestLikedPost.commentsCount} Comments</p>
          <p className="text-gray-500 text-sm">{highestLikedPost.shares} Shares</p>
        </div>
      </div>
    </div>
  );
};

export default HighestLikedPost;

import { Post } from "../../../types/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface CardProps {
  post: Post;
}

const Card: React.FC<CardProps> = React.memo(({ post }) => {
  const { categories, slug, title, images, author, readingTime } = post;

  return (
    <Link href={`/posts/${categories}/${slug}`} passHref>
      <div
        className="relative h-full rounded-lg overflow-hidden cursor-pointer"
        role="article"
        aria-label={`Read more about ${title}`}
      >
        <div className="absolute inset-0">
          <Image
            src={images?.[0]} // Default to a placeholder
            alt={title || "Post Image"} // Fallback alt text
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
           
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6 transition duration-300 hover:bg-opacity-70">
          <div className="text-left text-white w-full">
            <h3 className="text-4xl font-extrabold mb-2">{title}</h3>
            <p className="text-sm text-gray-300">
              {author} <span className="mx-2">•</span>{" "}
              <span className="text-xs text-gray-400">
                {readingTime ? `${readingTime} min read` : "Unknown read time"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

// Add display name for better debugging in React DevTools
Card.displayName = "Card";

export default Card;

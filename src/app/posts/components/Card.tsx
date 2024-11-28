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
      <div className="relative h-full rounded-lg overflow-hidden cursor-pointer">
        <div className="absolute inset-0">
          <Image
            src={images[0]} // The image source
            alt={title} // Add alt text for accessibility
            layout="fill" // Makes the image cover the container
            objectFit="cover" // Ensures the image covers the container properly
            objectPosition="center" // Center the image
            priority // Prioritize loading the first image
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6">
          <div className="text-left text-white w-full">
            <h3 className="text-4xl font-extrabold mb-2">{title}</h3>
            <p className="text-sm text-gray-300">
              {author} <span className="mx-2">•</span>{" "}
              <span className="text-xs text-gray-400">
                {readingTime} min read
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

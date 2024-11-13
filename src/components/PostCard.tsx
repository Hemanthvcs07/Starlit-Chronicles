import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/Interface/postTypes";

interface PostCardProps {
  post: Post;
  className: string;
}

const PostCard: React.FC<PostCardProps> = memo(({ post, className }) => {
  const titleClass = className === 'col-span-2 row-span-2' ? 'text-9xl' : 'text-3xl';
  const contentClass = className === 'col-span-2 row-span-2' ? 'text-2xl' : 'text-xl';

  return (
    <Link
      key={post.id}
      href={`/posts/${post.categories[0].toLowerCase()}/${post.slug}`}
      className={`${className} bg-gray-100 shadow-lg rounded-lg overflow-hidden relative flex flex-col`}
      style={{
        minHeight: className === 'col-span-2 row-span-2' ? "calc(50vh - 2rem)" : "calc(45vh - 1rem)"
      }}
      aria-label={`Go to post: ${post.slug}`}
    >
      <div className="absolute inset-0">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg opacity-50"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10 group">
        <p className={`font-semibold text-gray-600 mb-2 ${titleClass}`}>
          {post.title}
        </p>
        <p className={`text-black mb-4 flex-grow opacity-100 group-hover:opacity-100 transition-all duration-300 ease-in-out ${contentClass}`}>
          {post.content.slice(0, 500)}...
        </p>
      </div>
    </Link>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;

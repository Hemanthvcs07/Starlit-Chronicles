'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Post } from '../../../../types/types';

const PostCard = ({ post }: { post: Post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.categories}/${post.slug}`);
  };

  return (
    <div
      className="group relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
      onClick={handleClick}
    >
      <div className="relative w-full h-64">
        {post.images?.[0] ? (
          <Image
            src={post.images[0]}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-lg font-semibold text-white truncate">
          {post.title}
        </h3>
        <p className="text-sm text-gray-400">{post.readingTime} min read</p>
      </div>
    </div>
  );
};

export default PostCard;

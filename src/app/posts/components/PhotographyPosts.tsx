import { Post } from "../../../types/types";
import Link from "next/link";
import Image from "next/image";

interface PhotographyPostsProps {
  posts: Post[];
}

const PhotographyPost: React.FC<{ post: Post }> = ({ post }) => (
  <div
    key={post._id}
    className="flex flex-col md:flex-row items-center bg-transparent rounded-lg shadow-none overflow-hidden mb-12 p-4 md:p-6"
  >
    {/* Post Image */}
    <div className="relative w-full md:w-1/2 h-[350px] md:h-[450px] rounded-lg overflow-hidden mb-4 md:mb-0">
      <Image
        src={post.images[0] || "/default-thumbnail.jpg"}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
    </div>

    {/* Post Content */}
    <div className="w-full md:w-1/2 flex flex-col justify-between pl-0 md:pl-8 pt-4 md:pt-0">
      <h3 className="text-4xl font-extrabold text-white mb-4">{post.title}</h3>
      <p className="text-lg font-semibold text-gray-300 mb-4">{post.author}</p>
      <p className="text-gray-200 text-lg mb-6 line-clamp-4">{post.content}</p>

      <Link
        href={`/posts/${post.categories}/${post.slug}`}
        className="text-xl font-semibold text-blue-400 hover:text-blue-600 transition-all duration-200 ease-in-out"
      >
        Read more
      </Link>
    </div>
  </div>
);

const PhotographyPosts: React.FC<PhotographyPostsProps> = ({ posts }) => {
  // Sort posts by createdAt, descending order, and pick the most recent one
  const mostRecentPost = [...posts].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())[0];

  return (
    <section className="mb-16 px-4 py-16">
      <h2 className="text-6xl font-extrabold mb-12 text-center text-white">
        Photography Highlights
      </h2>
      {mostRecentPost ? (
        <PhotographyPost post={mostRecentPost} />
      ) : (
        <p className="text-center text-2xl text-gray-300">
          No posts available for this category.
        </p>
      )}
    </section>
  );
};

export default PhotographyPosts;

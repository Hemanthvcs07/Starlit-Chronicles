import { Post } from "../../../types/types";
import Link from "next/link";
import Image from "next/image";

interface TravelPostsProps {
  posts: Post[];
}

const TravelPosts: React.FC<TravelPostsProps> = ({ posts }) => {
  // Sort posts to display the most recent ones first
  const sortedPosts = posts.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-6 text-white">Travel Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Display Posts */}
        {sortedPosts.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No posts available for this category.</p>
        ) : (
          sortedPosts.slice(0, 4).map((post) => (  // Display first 4 posts
            <Link
              key={post._id}
              href={`/posts/${post.categories}/${post.slug}`}
              className="relative rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 group"
            >
              {/* Post Image */}
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <Image
                  src={post.images[0] || "/default-thumbnail.jpg"}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Post Content */}
              <div className="flex flex-col p-4 justify-between flex-1 text-gray-900 dark:text-white">
                <div className="flex flex-col h-full justify-between">
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 truncate">{post.title}</h3>

                  {/* Author and Reading Time */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="font-medium text-orange-400">{post.author || "Unknown Author"}</span>
                    <span className="text-xl text-gray-400">•</span>
                    <span className="text-gray-400">{post.readingTime} min read</span>
                  </div>

                  {/* Content */}
                  <p className="text-gray-500 mt-3 text-base line-clamp-3">{post.content}</p>
                </div>
              </div>
            </Link>
          ))
        )}

        {/* "See All" Card */}
        {posts.length >= 5 && (
          <Link
            href="/posts/travel"
            className="col-span-full xl:col-span-1 relative bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-300 transform hover:scale-105"
          >
            <div
              className="absolute inset-0 bg-cover bg-center rounded-2xl"
              style={{
                backgroundImage: `url('/default-thumbnail.jpg')`,
                filter: 'blur(20px)',
              }}
            ></div>
            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl font-semibold">See All Travel Posts</h3>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default TravelPosts;

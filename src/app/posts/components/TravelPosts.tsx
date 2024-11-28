import { Post } from "../../../types/types";
import Link from "next/link"; // Importing Link from Next.js

interface TravelPostsProps {
  posts: Post[]; // Accept the posts as props
}

const TravelPosts: React.FC<TravelPostsProps> = ({ posts }) => {
  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-6">Travel Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Display Posts */}
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No posts available for this category.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {/* Post Image */}
              <div
                className="w-full h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${post.images[0]})`,
                }}
              ></div>

              {/* Post Content */}
              <div className="flex flex-col p-4 justify-between flex-1">
                <div className="flex flex-col h-full justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.author}</p>
                  <p className="text-gray-700 mt-3 text-base line-clamp-3">{post.content}</p>
                </div>

                <Link
                  href={`/posts/${post.categories}/${post.slug}`}
                  className="mt-4 text-blue-600 font-semibold hover:text-blue-800"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))
        )}

        {/* Glassmorphic "See All" Card - Place it in the last available column */}
        {posts.length < 5 && (
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

import { Post } from "../../../types/types";
import Link from "next/link"; // Importing Link from Next.js

interface MusicPostsProps {
  posts: Post[]; // Accept the posts as props
}

const MusicPosts: React.FC<MusicPostsProps> = ({ posts }) => {
  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Music Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No posts available for this category.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Post Image */}
              <div
                className="w-full h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${post.images[0]})`,
                }}
              ></div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{post.author}</p>
                <p className="text-gray-800 mt-4 line-clamp-3">{post.content}</p>

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
        {/* Optional "See All" Link Card */}
        {posts.length < 3 && (
          <Link
            href="/posts/music"
            className="col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center p-6"
          >
            <h3 className="text-2xl font-semibold">See All Music Posts</h3>
          </Link>
        )}
      </div>
    </section>
  );
};

export default MusicPosts;

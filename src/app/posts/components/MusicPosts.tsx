import { Post } from "../../../types/types";
import Link from "next/link";

interface MusicPostsProps {
  posts: Post[];
}

const MusicPosts: React.FC<MusicPostsProps> = ({ posts }) => {
  const [recentPost, ...otherPosts] = posts; // The first post as recentPost, rest in otherPosts

  const renderRecentPostCard = (post: Post) => (
    <Link
      key={post._id}
      href={`/posts/${post.categories}/${post.slug}`}
      className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl overflow-hidden flex flex-col h-full"
    >
      {/* Post Image as Background */}
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.images[0]})` }}
        aria-label={`Image of ${post.title}`}
      >
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-6">
          <h3 className="text-4xl font-semibold text-white mb-2">{post.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{post.author}</p>
          <p className="text-sm text-gray-300 mb-4">Reading time: {post.readingTime} min</p>
        </div>
      </div>
    </Link>
  );

  const renderPostCard = (post: Post) => (
    <Link
      key={post._id}
      href={`/posts/${post.categories}/${post.slug}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 h-full">
        {/* Left Side - Post Image */}
        <div
          className="h-full w-full bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${post.images[0]})` }}
          aria-label={`Image of ${post.title}`}
        ></div>

        {/* Right Side - Post Content */}
        <div className="flex flex-col justify-between h-full p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2 truncate">{post.author}</p>
          <p className="text-sm text-gray-500">Reading time: {post.readingTime} min</p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="flex flex-col justify-between h-[90vh] mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Music Posts</h2>
      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8 h-full">
        {/* Left Side - Recent Post (Full Image Card) */}
        {recentPost && (
          <div className="lg:w-1/2 flex flex-col mb-8 lg:mb-0 h-full">
            {renderRecentPostCard(recentPost)}
          </div>
        )}

        {/* Right Side - Up to 3 Posts, Uniform Sized Cards */}
        <div className="lg:w-1/2 flex flex-col gap-4 h-full">
          {otherPosts.slice(0, 3).map(renderPostCard)} {/* Only show the first 3 posts */}
        </div>
      </div>
    </section>
  );
};

export default MusicPosts;

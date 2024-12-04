import { Post } from "../../../types/types";
import Card from "./Card"; // Import the Card component

interface FeaturedPostsProps {
  posts: Post[]; // Define the type of posts expected as prop
  maxDisplay?: number; // Optional prop to limit the number of displayed posts
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts, maxDisplay = 3 }) => {
  // Slice posts to limit display to maxDisplay
  const displayedPosts = posts.slice(0, maxDisplay);

  return (
    <section className=" min-h-[400px]" aria-labelledby="featured-posts">
      <h2 id="featured-posts" className="text-4xl font-bold mb-6">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Tile (Large) */}
        <div className="md:col-span-1 lg:col-span-2 h-full min-h-[250px]">
          {/* First card takes up large space on lg screens */}
          {displayedPosts[0] && <Card post={displayedPosts[0]} />}
        </div>

        {/* Right Tiles (Stacked on small, side-by-side on large) */}
        <div className="md:col-span-1 lg:col-span-1 h-full flex flex-col gap-y-6">
          {displayedPosts.slice(1).map((post, index) => (
            <div key={index} className="h-full min-h-[250px]">
              <Card post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;

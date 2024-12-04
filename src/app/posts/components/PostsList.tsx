import FeaturedPosts from "./FeaturedPosts";
import SeriesPosts from "./SeriesPosts";
import MusicPosts from "./MusicPosts";
import PhotographyPosts from "./PhotographyPosts";
import TravelPosts from "./TravelPosts";
import HeroSection from "../../components/HeroSection";
import { Post } from "../../../types/types";

interface PostListProps {
  posts: {
    featuredPosts: Post[];
    seriesPosts: Post[];
    travelPosts: Post[];
    musicPosts: Post[];
    photographyPosts: Post[];
  };
}

// Helper to group series posts by name
const groupSeriesByName = (
  seriesPosts: Post[],
  sortFn: (a: Post, b: Post) => number = (a, b) =>
    (a.episodeNumber || 0) - (b.episodeNumber || 0)
) => {
  const groupedMap = new Map<string, Post[]>();

  seriesPosts.forEach((post) => {
    if (post.seriesName) {
      const episodes = groupedMap.get(post.seriesName) || [];
      groupedMap.set(post.seriesName, [...episodes, post]);
    }
  });

  return Array.from(groupedMap.entries()).map(([seriesName, episodes]) => ({
    seriesName,
    episodes: episodes.sort(sortFn),
  }));
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  // Group series posts
  const groupedSeries = groupSeriesByName(posts.seriesPosts);

  return (
    <div className="container mx-auto px-5">
      <HeroSection />

      {/* Featured posts */}
      {posts.featuredPosts.length > 0 && (
        <div className="mt-12">
          <FeaturedPosts posts={posts.featuredPosts} maxDisplay={3} />
        </div>
      )}

      {/* Series posts */}
      {groupedSeries.length > 0 && (
        <div className="mt-12">
          <SeriesPosts groupedSeries={groupedSeries} />
        </div>
      )}

      {/* Travel posts */}
      {posts.travelPosts.length > 0 && (
        <div className="mt-12">
          <TravelPosts posts={posts.travelPosts} />
        </div>
      )}

      {/* Music posts */}
      {posts.musicPosts.length > 0 && (
        <div className="mt-12">
          <MusicPosts posts={posts.musicPosts} />
        </div>
      )}

      {/* Photography posts */}
      {posts.photographyPosts.length > 0 && (
        <div className="mt-12">
          <PhotographyPosts posts={posts.photographyPosts} />
        </div>
      )}
    </div>
  );
};

export default PostList;

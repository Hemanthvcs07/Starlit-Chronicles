import FeaturedPosts from "./FeaturedPosts";
import SeriesPosts from "./SeriesPosts";
import MusicPosts from "./MusicPosts";
import PhotographyPosts from "./PhotographyPosts";
import TravelPosts from "./TravelPosts";
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

const groupSeriesByName = (seriesPosts: Post[]) => {
  const groupedMap = new Map<string, Post[]>();

  seriesPosts.forEach((post) => {
    if (post.seriesName) {
      const episodes = groupedMap.get(post.seriesName) || [];
      groupedMap.set(post.seriesName, [...episodes, post]);
    }
  });

  return Array.from(groupedMap.entries()).map(([seriesName, episodes]) => ({
    seriesName,
    episodes: episodes.sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0)),
  }));
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const groupedSeries = groupSeriesByName(posts.seriesPosts);

  return (
    <div className="container mx-auto px-4">
      <FeaturedPosts posts={posts.featuredPosts} maxDisplay={3} />
      <SeriesPosts groupedSeries={groupedSeries} />
      <TravelPosts posts={posts.travelPosts} />
      <MusicPosts posts={posts.musicPosts} />
      <PhotographyPosts posts={posts.photographyPosts} />
    </div>
  );
};

export default PostList;

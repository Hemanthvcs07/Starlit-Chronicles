import React from "react";
import PostCard from "@/components/PostCard";
import { useTopPosts } from "@/hooks/useTopPosts";

const ModularGridLayout = () => {
  const topPosts = useTopPosts();

  return (
    <div className="min-h-[60vh] flex flex-col justify-between pt-9">
      <h2 className="text-6xl font-semibold text-center mb-8 text-gray-800">Top 3 Most Shared Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 flex-grow">
        {/* Travel Post */}
        {topPosts["Travel"] && (
          <PostCard
            post={topPosts["Travel"]}
            className="col-span-2 row-span-2"
          />
        )}

        {/* Music Post */}
        {topPosts["Music"] && (
          <PostCard
            post={topPosts["Music"]}
            className="col-span-1 row-span-1"
          />
        )}

        {/* Photography Post */}
        {topPosts["Photography"] && (
          <PostCard
            post={topPosts["Photography"]}
            className="col-span-1 row-span-1"
          />
        )}
      </div>
    </div>
  );
};

export default ModularGridLayout;

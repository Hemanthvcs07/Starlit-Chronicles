import { useMemo } from "react";
import { Post } from "@/Interface/postTypes";
import { getTopPostByShares } from "@/utils/getTopPostByShares";
import { postData } from "@/components/postData";

const categories = ["Travel", "Music", "Photography"];

export const useTopPosts = () => {
  return useMemo(() => {
    const topPosts = categories.reduce((acc, category) => {
      const filteredPosts = postData.filter(post => post.categories.includes(category));
      const topPost = getTopPostByShares(filteredPosts);
      acc[category] = topPost;
      return acc;
    }, {} as { [key: string]: Post });

    return topPosts;
  }, []);
};

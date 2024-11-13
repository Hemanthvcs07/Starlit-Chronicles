import { Post } from "@/Interface/postTypes";

export const getTopPostByShares = (posts: Post[]): Post => {
  return posts.sort((a, b) => b.shares - a.shares)[0];
};

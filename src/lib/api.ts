import { Post } from '../types/types';

export async function fetchPost(category: string, slug: string): Promise<Post> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${category}/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch the post');
  const data = await response.json();
  return data.post;
}

export async function fetchSuggestions(category: string, fetchedPost: Post): Promise<{
  seriesSuggestions: Post[];
  otherSuggestions: Post[];
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  if (!response.ok) throw new Error('Failed to fetch suggestions');
  const data = await response.json();

  const { featuredPosts, seriesPosts, travelPosts, musicPosts, photographyPosts } = data;

  const isSeriesPost = fetchedPost.categories === 'series';

  // Get Series Suggestions
  const seriesSuggestions = isSeriesPost
    ? [
        ...seriesPosts.filter(
          (post) =>
            post.seriesName === fetchedPost.seriesName &&
            post.episodeNumber === fetchedPost.episodeNumber + 1
        ),
        ...seriesPosts.filter((post) => post.seriesName !== fetchedPost.seriesName && post.episodeNumber === 1),
      ]
    : seriesPosts.filter((post) => post.episodeNumber === 1);

  // Get Other Suggestions (exclude series posts)
  const allOtherPosts = [
    ...travelPosts,
    ...musicPosts,
    ...photographyPosts,
    ...featuredPosts.filter((post) => post.categories !== 'series'),
  ];

  const otherSuggestions = allOtherPosts.filter((post) => post.slug !== fetchedPost.slug);

  return {
    seriesSuggestions,
    otherSuggestions,
  };
}

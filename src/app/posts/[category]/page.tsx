import { Post } from '../../../types/types';
import SeriesCard from '../components/cards/SeriesCard';
import PostCard from '../components/cards/PostCard';

async function fetchPosts(category: string): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${category}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

const CategoryPosts = async ({ params }: { params: { category: string } }) => {
  const posts = await fetchPosts(params.category);

  const groupedPosts = posts.reduce((acc: Record<string, Post[]>, post) => {
    const key = post.seriesName || 'standalone';
    acc[key] = acc[key] ? [...acc[key], post] : [post];
    return acc;
  }, {});

  const seriesPosts = Object.entries(groupedPosts).filter(([seriesName]) => seriesName !== 'standalone');
  const standalonePosts = groupedPosts.standalone || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">Posts in {params.category}</h1>

      {seriesPosts.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Series</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {seriesPosts.map(([seriesName, posts]) => (
              <SeriesCard key={seriesName} seriesName={seriesName} posts={posts} />
            ))}
          </div>
        </div>
      )}

      {standalonePosts.length > 0 && (
        <div className="space-y-8 mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Other Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {standalonePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPosts;

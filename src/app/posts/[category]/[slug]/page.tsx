import { postData } from '@/components/postData'; // Import your mock data
import Image from 'next/image';

export default function PostPage({ params }: { params: { category: string, slug: string } }) {
  const { category, slug } = params;

  // Find the post based on the slug and category
  const post = postData.find(
    (p) =>
      p.slug === slug && p.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
  );

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-xl">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="post-page">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">{post.date} - {post.readingTime}</p>
      <div className={`post ${post.background} p-4 mt-4`}>
        <Image src={post.image} alt={post.title} width={1200} height={800} className="w-full h-auto object-cover" />
        <p className="mt-4">{post.content}</p>
        <p className="mt-4 text-sm">
          <strong>Tags:</strong> {post.tags.join(", ")}
        </p>
        <p className="mt-4">
          <strong>Author:</strong> {post.author}
        </p>
        <p className="mt-4 text-sm">
          <strong>Shares:</strong> {post.shares} | <strong>Comments:</strong> {post.commentsCount}
        </p>
      </div>
    </div>
  );
}

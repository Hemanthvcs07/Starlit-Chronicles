// app/posts/page.tsx
import Image from "next/image";
import { postData } from '@/components/postData'; // Assuming your data is stored here

const PostsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">All Posts</h1>
      <div>
        {postData.map((post) => (
          <div key={post.id} className="post p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.metaDescription}</p>
            <Image width={20} height={20} src={post.image} alt={post.title} className="w-full h-60 object-cover" />
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Reading Time:</strong> {post.readingTime}</p>
            <a href={`/posts/${post.slug}`} className="text-blue-600">Read more...</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

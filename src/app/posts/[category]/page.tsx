import Image from "next/image";
import { postData } from '@/components/postData'; // Assuming your mock data is located here

// Get the posts based on the category dynamically
export default function CategoryPage({ params }: { params: { category: string } }) {
  // Convert category to lowercase
  const category = params.category.toLowerCase();

  // Filter posts that match the selected category
  const filteredPosts = postData.filter(post =>
    post.categories.some(cat => cat.toLowerCase() === category) // Check if the post has the category (case-insensitive)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Posts in {category} Category</h1>
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className={`post ${post.background} p-4`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.metaDescription}</p>
              <Image width={90} height={90} src={post.image} alt={post.title} className="w-full h-60 object-cover" />
              <p><strong>Author:</strong> {post.author}</p>
              <p><strong>Reading Time:</strong> {post.readingTime}</p>
              <a href={`/posts/${category}/${post.slug}`} className="text-blue-600">Read more...</a>
            </div>
          ))
        ) : (
          <p>No posts found in this category.</p>
        )}
      </div>
    </div>
  );
}

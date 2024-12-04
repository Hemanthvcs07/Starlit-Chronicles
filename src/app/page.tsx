import Navbar from "./components/Navbar";
import PostList from "./posts/components/PostsList";

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts`, {
      cache: "no-store", // Ensure fresh data on every request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null; // Return null on error
  }
};

const HomePage = async () => {
  // Fetch posts server-side
  const posts = await fetchPosts();

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <main>
        {/* Render PostList only if posts are available */}
        {posts ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-center mt-4 text-gray-500">
            Unable to load posts. Please try again later.
          </p>
        )}
      </main>
    </div>
  );
};

export default HomePage;

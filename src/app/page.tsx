import Navbar from "./components/Navbar";
import PostList from './posts/components/PostsList';

// Fetch posts server-side
const fetchPosts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      cache: "no-store", // Ensures fresh data on every request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      featuredPosts: [],
      seriesPosts: [],
      travelPosts: [],
      musicPosts: [],
      photographyPosts: [],
    };
  }
};

const HomePage = async () => {
  // Fetch posts when the page loads
  const posts = await fetchPosts();

  return (
    <div>
      <Navbar />  {/* Add Navbar component */}
      
      <main>
        {/* Pass posts data to PostList component */}
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default HomePage;

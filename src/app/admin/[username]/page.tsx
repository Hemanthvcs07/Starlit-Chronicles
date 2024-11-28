"use client";

import { useAuth } from "../hooks/useAuth"; // Custom hook for authentication
import Link from "next/link";
import UsersList from "../../user/components/UsersList";
import { useRouter } from "next/navigation";
import BlogForm from "../../posts/components/Form/BlogPostForm";
import PostEdit from "../../posts/components/EditPost/PostList";

const AdminPage = () => {
  const { user, loading } = useAuth(); // Use the custom hook
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 py-4 px-6 shadow-md fixed w-full z-10 top-0 left-0">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-blue-400">Starlit&apos;s Admin</div>
          <div className="flex items-center space-x-6">
            <Link
              href="/admin/posts"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              Posts
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg shadow-md transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-24 space-y-12 pt-24">
        {/* Welcome Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center mb-4">
            Welcome back, <span className="text-blue-400">{user?.username}</span>!
          </h1>
          <p className="text-center text-gray-300">Manage your content and users from this dashboard.</p>
        </section>

        {/* Users Management Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <UsersList />
        </section>

        {/* Blog Post Form Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create or Edit Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <BlogForm />
            </div>
            <div className="space-y-6">
              <PostEdit />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-gray-500 text-sm border-t border-gray-700 mt-auto">
        &copy; {new Date().getFullYear()} Starlit. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AdminPage;

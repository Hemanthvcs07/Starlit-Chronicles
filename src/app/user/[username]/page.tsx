"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Import useParams

const UserPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { username } = useParams(); // Get the username from URL using useParams

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect immediately if no token
      router.push("/auth/login");
      return;
    }

    const tokenData = JSON.parse(atob(token.split(".")[1]));
    setUser({ role: tokenData.role, username: tokenData.username });

    // If the URL username doesn't match the logged-in username, redirect to login
    if (username && username !== tokenData.username) {
      router.push("/auth/login");
    }
  }, [router, username]);

  if (!user) return null; // Don't render if user data is not available yet

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Welcome, {user.username}!</h1>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xl font-medium">Your Role:</span>
          <div
            className={`text-lg font-semibold ${
              user.role === 'Admin' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {user.role}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4">
          <p className="text-sm text-gray-400">
            This is a secure page that can only be accessed by logged-in users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

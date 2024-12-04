import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // If no token, redirect to login page
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      // Decode the JWT token (extract payload from token)
      const tokenData = JSON.parse(atob(token.split(".")[1]));

      // Check if the token has expired or is invalid
      const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
      if (tokenData.exp < currentTime) {
        console.error("Token expired");
        localStorage.removeItem("authToken");
        router.push("/auth/login");
        return;
      }

      // Set the user data if the token is valid
      setUser({
        userId: tokenData.userId,
        role: tokenData.role,
        username: tokenData.username,
      });

      // Redirect non-admin users (optional: you can further extend this logic for other roles)
      if (tokenData.role !== "Admin") {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("authToken");
      router.push("/auth/login");
    } finally {
      setLoading(false); // Set loading to false after checking
    }
  }, [router]);

  return { user, loading };
};

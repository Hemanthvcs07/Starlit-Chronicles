'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect immediately if no token
      router.push("/auth/login");
    } else {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      // Decode token to retrieve user data
      setUser({ role: tokenData.role, username: tokenData.username });
    }
  }, [router]);

  // If the user object is not set, we don't render anything
  if (!user) return null; // This prevents the "Loading..." state from appearing

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Your role: {user.role}</p>
    </div>
  );
};

export default UserPage;

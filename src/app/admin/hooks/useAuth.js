// app/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      setUser({ role: tokenData.role, username: tokenData.username });

      if (tokenData.role !== "Admin") {
        router.push("/auth/login"); // Redirect non-admin users
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  }, [router, setUser]);

  return { user, loading };
};

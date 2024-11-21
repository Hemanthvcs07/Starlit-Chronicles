'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup only
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSwitchForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      if (isLogin) {
        localStorage.setItem("authToken", data.token);
        const { role, username } = JSON.parse(atob(data.token.split(".")[1]));
        router.push(`/${role.toLowerCase()}/${username}`);
      } else {
        setIsLogin(true); // Switch to login mode after successful signup
        router.push("/"); // Redirect to homepage
      }
    } else {
      setErrorMessage(data.error || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Sign Up Form */}
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 mb-6 w-full rounded-md text-gray-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`${
              isLogin ? "bg-green-600" : "bg-blue-600"
            } text-white p-3 w-full rounded-md hover:bg-green-700 transition`}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleSwitchForm}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="font-semibold text-blue-700">
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

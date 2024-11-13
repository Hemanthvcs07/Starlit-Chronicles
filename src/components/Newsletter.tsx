'use client';
import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate a successful signup after a short delay
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2">Join Our Adventure!</h2>
      <p className="text-gray-700 mb-6 italic">
        Sign up to get stories that whisk you away, tunes to groove to, and snapshots that’ll make you say, &quot;I need to go there!&quot;
      </p>
      
      {status === "success" ? (
        <p className="text-green-600 font-semibold">
          🎉 Awesome! Check your inbox for our latest scoop. Can’t wait to have you along for the ride!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Your email, adventurer..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-center"
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition-colors duration-300 ${
              status === "loading" ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing you up..." : "Count Me In!"}
          </button>
        </form>
      )}
      
      <p className="text-sm text-gray-500 mt-4">
        No spam, just pure joy. And the occasional bad joke.
      </p>
    </div>
  );
};

export default NewsletterSignup;

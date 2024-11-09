'use client'
import { useState } from "react";

const AuthModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle state for Sign Up / Sign In
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state

  // Reset form fields when toggling between forms
  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
    setEmail(""); // Clear email input
    setPassword(""); // Clear password input
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    // After form submission, clear the inputs and close the modal
    setEmail("");
    setPassword("");
    closeModal(); // Close the modal after submit
  };

  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full transform transition-transform duration-300 ease-in-out scale-100">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold transition-all duration-200 ease-in-out"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{isSignUp ? "Create an Account" : "Welcome Back"}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={toggleAuth}
            className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

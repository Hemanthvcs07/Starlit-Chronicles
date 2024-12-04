'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSwitchForm = () => setIsLogin(!isLogin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, name } = formData;
    const endpoint = isLogin ? '/api/auth/login' : '/api/users';
    const body = isLogin
      ? { email, password }
      : { name, email, password };

    // Validate input fields
    if (!email || !password || (!isLogin && !name)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('authToken', data.token);
          const { role, username } = JSON.parse(atob(data.token.split('.')[1]));
          window.location.href = `/${role.toLowerCase()}/${username}`;
        } else {
          setIsLogin(true); // Switch to login mode after successful signup
          window.location.href = '/'; // Redirect to homepage
        }
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log(error);
      alert('Error connecting to server. Please try again.');
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Sign Up Form */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-4 w-full rounded-md text-gray-700"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-6 w-full rounded-md text-gray-700"
            required
          />

          <button
            type="submit"
            className={`${
              isLogin ? 'bg-green-600' : 'bg-blue-600'
            } text-white p-3 w-full rounded-md hover:bg-green-700 transition`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleSwitchForm}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
            <span className="font-semibold text-blue-700">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};

export default Modal;

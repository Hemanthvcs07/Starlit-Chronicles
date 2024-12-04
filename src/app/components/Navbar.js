'use client';
import React, { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md ">
      <div className="max-w-full px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/letter-s.png"
              alt="Starlit Logo"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {['Travel', 'Music', 'Photography', 'Series'].map((link, index) => (
              <Link
                key={index}
                href={`/posts/${link.toLowerCase()}`}
                className="text-white text-lg hover:text-indigo-400 transition duration-300"
              >
                {link}
              </Link>
            ))}

            {/* Profile Button */}
            <button
              onClick={toggleModal}
              className="w-10 h-10 bg-gray-500 rounded-full bg-cover hover:scale-110 transition-transform duration-300"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/736x/7b/c8/65/7bc8653fdb5f3306073ede609c787773.jpg")',
              }}
            ></button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl md:hidden focus:outline-none hover:text-indigo-400 transition"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {['Travel', 'Music', 'Photography', 'Series'].map((link, index) => (
              <Link
                key={index}
                href={`/posts/${link.toLowerCase()}`}
                className="text-white text-lg hover:text-indigo-400 transition duration-300"
              >
                {link}
              </Link>
            ))}

            {/* Profile Button */}
            <button
              onClick={toggleModal}
              className="w-12 h-12 mx-auto bg-gray-500 rounded-full bg-cover hover:scale-110 transition-transform duration-300"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/736x/7b/c8/65/7bc8653fdb5f3306073ede609c787773.jpg")',
              }}
            ></button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && <Modal closeModal={toggleModal} />}
    </nav>
  );
};

export default Navbar;

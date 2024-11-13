'use client';
import { useState } from "react";
import Link from "next/link";
import AuthModal from "../components/AuthModal";
import Image from 'next/image';
import starlit from './Vector.svg';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-white bg-opacity-30 backdrop-blur-lg shadow-lg z-40 text-black">
        <div className="container mx-auto px-20 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image src={starlit} alt="Starlit Logo" width={35} height={35} />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="hover:text-gray-200 transition-colors duration-300">About</Link>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="hover:text-gray-200 transition-colors duration-300">
              Sign In / Sign Up
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="hover:text-gray-200 transition-colors duration-300">
              Menu
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-md shadow-lg py-4 absolute top-16 left-0 w-full">
            <div className="flex flex-col items-center space-y-4">
              <Link href="/about" className="text-black hover:text-gray-200 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>About</Link>
              <button 
                onClick={() => {
                  setIsMenuOpen(false); 
                  setIsModalOpen(true);
                }} 
                className="text-black hover:text-gray-200 transition-colors duration-300">
                Sign In / Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;

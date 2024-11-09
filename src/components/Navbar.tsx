'use client'
import { useState } from "react";
import Link from "next/link";
import AuthModal from "../components/AuthModal"; 
import Image from 'next/image'
import starlit from './Vector.svg'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-5">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={starlit} alt="Starlit Logo" width={35} />
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link href="/about" className="text-white hover:text-gray-400">About</Link>
          <button onClick={() => setIsModalOpen(true)} className="text-white hover:text-gray-400">
            Sign In / Sign Up
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;

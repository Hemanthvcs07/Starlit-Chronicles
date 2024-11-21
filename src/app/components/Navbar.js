import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component
import Link from "next/link";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href='/' className="text-white text-xl">Starlit</Link>
      <button
        onClick={toggleModal}
        className="w-10 h-10 bg-gray-500 rounded-full bg-cover"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/7b/c8/65/7bc8653fdb5f3306073ede609c787773.jpg")', // Add your image URL here
        }}
      ></button>

      {isModalOpen && <Modal closeModal={toggleModal} />}
    </nav>
  );
};

export default Navbar;

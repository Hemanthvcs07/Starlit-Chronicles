'use client';
import React from "react";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-[85vh] bg-cover bg-center flex items-center justify-center text-white rounded-2xl"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Welcome to Starlit Chronicles</h1>
        <p className="text-lg sm:text-2xl">
          Explore stories, adventures, and more through our unique lens.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

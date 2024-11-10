import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-gray-900 text-white">
      {/* Responsive Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1498026474556-93048b8493d8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero background image for Starlit Chronicles"
          fill // New property to fill the entire container
          priority={true}
          className="object-cover opacity-50"
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4">
          Starlit Chronicles
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-6">
          Discover stories of wanderlust, rhythm, and captured moments through
          the lens of travel, music, and photography.
        </p>
        <a
          href="#blog"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-semibold transition ease-in-out duration-300 transform hover:scale-105"
        >
          Explore Blog
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

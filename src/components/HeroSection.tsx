import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[82vh] bg-gray-900 text-white rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1485498128961-422168ba5f87?q=80&w=1860&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero background image for Starlit Chronicles"
          fill
          priority={true}
          className="object-cover opacity-50"
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-3">
          Starlit Chronicles
        </h1>
        <p className="text-base md:text-lg max-w-xl mb-4">
          Discover stories of wanderlust, rhythm, and captured moments through
          the lens of travel, music, and photography.
        </p>
        <a
          href="#blog"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-transform duration-300 hover:scale-105"
        >
          Explore Blog
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

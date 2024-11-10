'use client';
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { postData } from '../postData'; // Import post data

const ResponsiveTwoColumnLayout = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  const topPosts = postData.slice(0, 4);
  const allPosts = postData;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column: Full Height Embla Carousel */}
      <div className="embla overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {allPosts.map((post) => (
            <div key={post.id} className="flex-shrink-0 w-full h-full">
              <div className="relative flex flex-col items-center justify-center text-center text-white rounded-lg overflow-hidden h-full bg-green-300">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 z-0 opacity-50"
                />
                <div className="z-10 p-6">
                  <h3 className="text-3xl font-bold mb-2">{post.title}</h3>
                  <p className="text-lg">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Top 4 Small Cards */}
      <div className="flex flex-col gap-4 h-full">
        {topPosts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center flex-grow">
            <div className="w-full h-16 relative mb-4">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-md font-semibold text-center">{post.title}</h3>
            <p className="text-xs text-gray-700 text-center">{post.content.slice(0, 50)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTwoColumnLayout;

"use client";
import Link from "next/link";
import { GroupedSeries } from "../../../types/types";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useState, useCallback, useRef, useEffect } from "react";

const SeriesPosts = ({ groupedSeries }: { groupedSeries: GroupedSeries[] }) => {
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const positionRef = useRef({ x: 0, y: 0 });

  // Check for small screens using `window.matchMedia`
  const handleResize = useCallback(() => {
    setIsSmallScreen(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // Add resize and scroll listeners on mount
  useEffect(() => {
    handleResize(); // Initial check
    const handleScroll = () => setHoveredSeries(null);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize]);

  const handleMouseEnter = useCallback(
    (seriesName: string, event: React.MouseEvent<HTMLDivElement>) => {
      if (!isSmallScreen) {
        setHoveredSeries(seriesName);
        const position = { x: event.clientX, y: event.clientY };
        positionRef.current = position;
        setHoverPosition(position);
      }
    },
    [isSmallScreen]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isSmallScreen) {
        const position = { x: event.clientX, y: event.clientY };
        positionRef.current = position;
        setHoverPosition(position);
      }
    },
    [isSmallScreen]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredSeries(null);
  }, []);

  if (groupedSeries.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-gray-100 text-center">
        Series
      </h2>
      <div className="space-y-16 relative">
        {groupedSeries.map((series) => {
          const firstEpisode = series.episodes[0];
          return (
            <div
              key={series.seriesName}
              className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-6 transition-all duration-300 group relative"
              onMouseEnter={(e) => handleMouseEnter(series.seriesName, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Series Information */}
              <div className="flex-1 text-left mb-6 md:mb-0">
                <h3 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  {series.seriesName}
                </h3>

                <p className="text-base sm:text-lg text-gray-300 mt-2 flex items-center sm:space-x-2">
                  <span className="font-medium">
                    {firstEpisode.author || "Unknown Author"}
                  </span>
                  <span className="mx-2 text-xl text-gray-500">•</span>
                  <span className="font-medium">
                    {series.episodes.length}{" "}
                    {series.episodes.length > 1 ? "Episodes" : "Episode"}
                  </span>
                </p>
              </div>

              {/* Start Reading Button - Hidden on Small Screens */}
              {!isSmallScreen && (
                <Link
                  href={`/posts/${firstEpisode.categories}/${firstEpisode.slug}`}
                  className="flex items-center text-sm sm:text-lg font-medium text-white border-2 border-white hover:border-orange-500 py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 ease-in-out"
                >
                  <span>Start Reading</span>
                  <FaArrowRight className="ml-2 sm:ml-3 text-lg transition-transform duration-300 ease-in-out transform group-hover:translate-x-2 group-hover:scale-105" />
                </Link>
              )}

              {/* Hover Image - Only for larger screens */}
              {hoveredSeries === series.seriesName && !isSmallScreen && (
                <div
                  className="fixed z-50 w-60 sm:w-80 h-36 sm:h-48 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 pointer-events-none"
                  style={{
                    top: hoverPosition.y + 15 + "px",
                    left: hoverPosition.x + 15 + "px",
                  }}
                >
                  <Image
                    src={firstEpisode.images[0] || "/default-thumbnail.jpg"}
                    alt={series.seriesName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SeriesPosts;

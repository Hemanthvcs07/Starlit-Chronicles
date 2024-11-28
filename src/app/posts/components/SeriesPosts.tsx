import Link from "next/link";
import { GroupedSeries } from "../../../types/types";

const SeriesPosts = ({ groupedSeries }: { groupedSeries: GroupedSeries[] }) => {
  if (groupedSeries.length < 2) {
    return null; // Return nothing if there are fewer than 2 series
  }

  // Get the first and second series
  const firstSeries = groupedSeries[0];
  const secondSeries = groupedSeries[1];

  const firstEpisodeFirstSeries = firstSeries.episodes[0];
  const episodeCountFirstSeries = firstSeries.episodes.length;

  const firstEpisodeSecondSeries = secondSeries.episodes[0];
  const episodeCountSecondSeries = secondSeries.episodes.length;

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-6 text-gray-100">Series</h2>

      {/* First Row - Left image, Right empty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* First Series */}
        <Link
          key={firstSeries.seriesName}
          href={`/posts/${firstEpisodeFirstSeries.categories}/${firstEpisodeFirstSeries.slug}`}
          className="relative block bg-white rounded-xl overflow-hidden group"
        >
          {/* Image */}
          <div
            className="w-full h-64 bg-cover bg-center transition-all duration-300 ease-in-out brightness-75 group-hover:brightness-50"
            style={{
              backgroundImage: `url(${firstEpisodeFirstSeries.images[0]})`,
            }}
          ></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover:text-gray-100">
              {firstSeries.seriesName}
            </h3>
            <p className="text-lg font-semibold text-gray-300 mt-2 transition-all duration-300 ease-in-out group-hover:text-gray-100">
              {episodeCountFirstSeries} {episodeCountFirstSeries > 1 ? "Episodes" : "Episode"}
            </p>
          </div>
        </Link>

        {/* Empty space */}
        <div className="hidden sm:block"></div>
      </div>

      {/* Second Row - Left empty, Right Series */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        {/* Empty space */}
        <div className="hidden sm:block"></div>

        {/* Second Series */}
        <Link
          key={secondSeries.seriesName}
          href={`/posts/${firstEpisodeSecondSeries.categories}/${firstEpisodeSecondSeries.slug}`}
          className="relative block bg-white rounded-xl overflow-hidden group"
        >
          {/* Image */}
          <div
            className="w-full h-64 bg-cover bg-center transition-all duration-300 ease-in-out brightness-75 group-hover:brightness-50"
            style={{
              backgroundImage: `url(${firstEpisodeSecondSeries.images[0] || "/default-thumbnail.jpg"})`,
            }}
          ></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover:text-gray-100">
              {secondSeries.seriesName}
            </h3>
            <p className="text-lg font-semibold text-gray-300 mt-2 transition-all duration-300 ease-in-out group-hover:text-gray-100">
              {episodeCountSecondSeries} {episodeCountSecondSeries > 1 ? "Episodes" : "Episode"}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SeriesPosts;

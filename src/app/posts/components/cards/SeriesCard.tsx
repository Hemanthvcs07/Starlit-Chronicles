'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Post } from '../../../../types/types';

const SeriesCard = ({
  seriesName,
  posts,
}: {
  seriesName: string;
  posts: Post[];
}) => {
  const router = useRouter();

  const handleClick = () => {
    const category = posts[0]?.categories; // Assuming all posts in the series belong to the same category
    router.push(`/posts/${category}/${seriesName}`);
  };

  const firstEpisode = posts.sort(
    (a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0)
  )[0];

  return (
    <div
      className="group relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
      onClick={handleClick}
    >
      <div className="relative w-full h-64">
        {firstEpisode.images?.[0] ? (
          <Image
            src={firstEpisode.images[0]}
            alt={seriesName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-lg font-semibold text-white truncate">
          {seriesName}
        </h3>
        <p className="text-sm text-gray-300">{posts.length} Episodes</p>
      </div>
    </div>
  );
};

export default SeriesCard;

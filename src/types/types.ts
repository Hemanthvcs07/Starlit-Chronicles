export type Post = {
  _id: string;
  title: string;
  slug: string;
  categories: ('travel' | 'music' | 'photography' | 'series')[]; // Updated to a union type for categories
  author: string;
  content: string;
  images: string[];
  readingTime: number; // Added reading time
  isFeatured: boolean; // Added featured flag
  datePosted: string; // ISO date string format
  episodeNumber?: number; // Optional, for series posts
  seriesName?: string; // Optional, for series posts
  parentSeries?: string; // Optional, for episodes that reference the parent series
  totalEpisodes?: number; // Optional, for series posts
};


export type GroupedSeries = {
  seriesName: string;
  episodes: Post[];
};

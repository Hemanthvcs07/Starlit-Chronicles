export type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  categories: string;
  tags: string[];
  images: string[];
  readingTime: number;
  isFeatured: boolean;
  seriesName?: string;
  episodeNumber?: number;
  totalEpisodes?: number;
  datePosted: string;
};


export type GroupedSeries = {
  seriesName: string;
  episodes: Post[];
};

/**
 * Utility functions to filter and categorize blog posts.
 */

/**
 * Filter posts by category.
 * @param {Array} posts - Array of blog posts.
 * @param {string} category - The category to filter by.
 * @returns {Array} - Filtered posts.
 */
export const filterByCategory = (posts, category) => {
    return posts.filter((post) => post.categories === category);
  };
  
  /**
   * Get all featured posts.
   * @param {Array} posts - Array of blog posts.
   * @returns {Array} - Featured posts.
   */
  export const getFeaturedPosts = (posts) => {
    return posts.filter((post) => post.isFeatured);
  };
  
  /**
 * Organize series posts by their series name and episodes.
 * @param {Array} posts - Array of blog posts.
 * @returns {Object} - Organized series posts.
 */
export const organizeSeries = (posts) => {
    const seriesPosts = posts.filter((post) => post.categories === "series");
  
    const organizedSeries = seriesPosts.reduce((acc, post) => {
      const { seriesName } = post;
  
      // Skip posts without a series name
      if (!seriesName) return acc;
  
      // Initialize an empty array for the series if it doesn't exist yet
      if (!acc[seriesName]) {
        acc[seriesName] = [];
      }
  
      // Push the post to its respective series
      acc[seriesName].push(post);
  
      return acc;
    }, {});
  
    // Now, sort the posts by episodeNumber after organizing
    for (const seriesName in organizedSeries) {
      organizedSeries[seriesName].sort((a, b) => a.episodeNumber - b.episodeNumber);
    }
  
    return organizedSeries;
  };
  
  
  /**
   * Get posts filtered by tags.
   * @param {Array} posts - Array of blog posts.
   * @param {string} tag - The tag to filter by.
   * @returns {Array} - Filtered posts.
   */
  export const filterByTag = (posts, tag) => {
    return posts.filter((post) => post.tags.includes(tag));
  };
  
  /**
   * Get posts sorted by date (latest first).
   * @param {Array} posts - Array of blog posts.
   * @returns {Array} - Posts sorted by date.
   */
  export const sortByDate = (posts) => {
    return posts.slice().sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
  };
  // helpers/postHelper.js

// Example function to simulate fetching post data by slug
export const getPostBySlug = async (slug) => {
    const response = await fetch(`/api/posts/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    return data.post; // Assuming the API returns the post data in this format
  };
  
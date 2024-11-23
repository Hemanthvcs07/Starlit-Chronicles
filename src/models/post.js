import mongoose from 'mongoose';

// Function to estimate reading time based on word count (assuming 200 words per minute)
const estimateReadingTime = (content) => {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200); // Average reading time in minutes
};

// Enum for categories
const categoryEnum = ['travel', 'music', 'photography', 'series'];

// Blog post schema definition
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true, // To avoid unnecessary spaces
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  categories: {
    type: String,
    enum: categoryEnum,
    required: true,
  },

  tags: [
    {
      type: String,
      required: true,
    },
  ],

  images: [
    {
      type: String,
      trim: true,
    },
  ],

  readingTime: {
    type: Number,
    required: true,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  datePosted: {
    type: Date,
    default: Date.now,
  },

  // Fields related to "series" category
  seriesName: {
    type: String,
    required: function () {
      return this.categories === 'series';
    },
    trim: true,
  },

  episodeNumber: {
    type: Number,
    required: function () {
      return this.categories === 'series';
    },
    min: 1,
  },

  parentSeries: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: function () {
      return this.categories === 'series' && this.episodeNumber > 1;
    },
  },

  totalEpisodes: {
    type: Number,
    default: 0,
    required: function () {
      return this.categories === 'series';
    },
  },
});

// Pre-save hook to calculate reading time
blogPostSchema.pre('save', function (next) {
  if (this.content) {
    this.readingTime = estimateReadingTime(this.content);
  }
  next();
});

// Pre-update hook to manage timestamps
blogPostSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Ensure slugs are unique across posts and categories
blogPostSchema.index({ slug: 1, categories: 1 }, { unique: true });

// Create and export the model
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;

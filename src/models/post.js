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
    trim: true,
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
    default: function () {
      return this.content ? estimateReadingTime(this.content) : 0;
    },
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

  // Fields specific to "series" category
  seriesName: {
    type: String,
    validate: {
      validator: function (value) {
        return this.categories === 'series' ? !!value : true;
      },
      message: 'Series name is required for series posts.',
    },
    trim: true,
  },

  episodeNumber: {
    type: Number,
    min: [1, 'Episode number must be at least 1.'],
    validate: {
      validator: function (value) {
        return this.categories === 'series' ? value > 0 : true;
      },
      message: 'Episode number must be greater than 0 for series posts.',
    },
  },

  parentSeries: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    validate: {
      validator: function (value) {
        return this.categories === 'series' && this.episodeNumber > 1 ? !!value : true;
      },
      message: 'Parent series ID is required for episodes after the first in a series.',
    },
  },

  totalEpisodes: {
    type: Number,
    validate: {
      validator: function (value) {
        return this.categories === 'series' ? value >= this.episodeNumber : true;
      },
      message: 'Total episodes must be greater than or equal to the current episode number.',
    },
  },
});

// Pre-save hook to calculate reading time if not explicitly set
blogPostSchema.pre('save', function (next) {
  if (this.content && !this.readingTime) {
    this.readingTime = estimateReadingTime(this.content);
  }
  next();
});

// Ensure slugs are unique across posts and categories
blogPostSchema.index({ slug: 1, categories: 1 }, { unique: true });

// Create and export the model
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;

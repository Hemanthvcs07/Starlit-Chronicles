import mongoose from 'mongoose';

// Function to estimate reading time based on word count (assuming 200 words per minute)
const estimateReadingTime = (content) => {
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading time in minutes
  return readingTime;
};

// Enum for categories
const categoryEnum = ['travel', 'music', 'photography', 'series'];

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
});

// Pre-save hook to calculate reading time (no need to generate slug here)
blogPostSchema.pre('save', function (next) {
  if (this.content) {
    this.readingTime = estimateReadingTime(this.content);
  }

  next();
});

blogPostSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;

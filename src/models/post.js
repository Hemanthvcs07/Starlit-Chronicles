const mongoose = require("mongoose");

// Define the schema for the Post model
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      maxlength: [100, "Post title must be less than 100 characters"],
      unique: true, // Ensure no duplicate titles
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [50, "Post content must be at least 50 characters long"],
    },
    author: {
      type: String,
      required: [true, "Post must have an author"],
      trim: true,
      maxlength: [50, "Author name must be less than 50 characters"],
    },
    categories: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return value.every((category) => typeof category === "string");
        },
        message: "Each category must be a string",
      },
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return value.every((tag) => typeof tag === "string");
        },
        message: "Each tag must be a string",
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // Ensure the slug is unique
    },
    image: {
      type: String,
      default: "", // URL of the image (can be empty initially)
      validate: {
        validator: function (value) {
          return /^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp|svg)$/.test(value);
        },
        message:
          "Image URL must be a valid URL with an image extension (jpeg, jpg, png, gif, bmp, svg)",
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from the title before saving the post
postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  }
  next();
});

// Index to optimize searching by slug and author
postSchema.index({ slug: 1 });
postSchema.index({ author: 1, published: 1 });

// Virtual field to get formatted creation date
postSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Model for the Post schema
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;

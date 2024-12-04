import connectDB from "../../../lib/db";
import BlogPost from "../../../models/post";
import { NextResponse } from "next/server";

connectDB();

// Helper: Create consistent response
const createResponse = (message, data = null, status = 200) => 
  NextResponse.json({ status, message, data }, { status });

// Helper: Validate required fields
const validateFields = (fields, data) => {
  const missingFields = fields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }
  return null;
};

// GET: Fetch all posts
export const GET = async () => {
  try {
    const posts = (await BlogPost.find()) || []; // Ensure posts is always an array

    // Initialize categories
    const categories = {
      featuredPosts: [],
      seriesPosts: [],
      travelPosts: [],
      musicPosts: [],
      photographyPosts: [],
    };

    // Categorize posts
    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        if (post.isFeatured) categories.featuredPosts.push(post);
        if (post.categories === "series") categories.seriesPosts.push(post);
        if (post.categories === "travel") categories.travelPosts.push(post);
        if (post.categories === "music") categories.musicPosts.push(post);
        if (post.categories === "photography") categories.photographyPosts.push(post);
      });
    } else {
      console.error("Posts is not an array:", posts);
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
};


// POST: Create a new post
export const POST = async (req) => {
  try {
    const data = await req.json();
    const requiredFields = ["title", "content", "author", "categories", "tags"];
    const validationError = validateFields(requiredFields, data);

    if (validationError) {
      return createResponse(validationError, null, 400);
    }

    // Prepare the base post data
    const postData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      images: data.images ? data.images.split(",").map((img) => img.trim()) : [],
    };

    // Series-specific validation
    if (data.categories === "series") {
      if (!data.seriesName) {
        return createResponse("Series name is required for series posts", null, 400);
      }
      if (!data.episodeNumber || data.episodeNumber < 1) {
        return createResponse("Episode number must be greater than 0", null, 400);
      }
      if (data.totalEpisodes && data.totalEpisodes < data.episodeNumber) {
        return createResponse("Total episodes cannot be less than episode number", null, 400);
      }
    }

    const newPost = new BlogPost(postData);
    await newPost.save();

    return createResponse("Post created successfully", newPost, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return createResponse("Error creating the post", null, 500);
  }
};

// PUT: Update a post
export const PUT = async (req) => {
  try {
    const data = await req.json();
    if (!data.slug) {
      return createResponse("Slug is required to update a post", null, 400);
    }

    const updatedPost = await BlogPost.findOneAndUpdate({ slug: data.slug }, data, { new: true });
    if (!updatedPost) {
      return createResponse("Post not found", null, 404);
    }

    return createResponse("Post updated successfully", updatedPost, 200);
  } catch (error) {
    console.error("Error updating post:", error);
    return createResponse("Error updating the post", null, 500);
  }
};

// DELETE: Remove a post by ID
export const DELETE = async (req) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return createResponse("ID is required to delete a post", null, 400);
    }

    const deletedPost = await BlogPost.findOneAndDelete({ _id: id });
    if (!deletedPost) {
      return createResponse("Post not found", null, 404);
    }

    return createResponse("Post deleted successfully", deletedPost, 200);
  } catch (error) {
    console.error("Error deleting post:", error);
    return createResponse("Error deleting the post", null, 500);
  }
};

// api/posts/route.js

import connectDB from '../../../lib/db';
import BlogPost from '../../../models/post';
import { NextResponse } from 'next/server';

connectDB(); // Ensure DB connection is established

// GET all posts
export const GET = async () => {
  try {
    const posts = await BlogPost.find().sort({ datePosted: -1 }); // Get posts sorted by the latest
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
};

// POST a new blog post
export const POST = async (req) => {
  try {
    const { title, slug, content, author, categories, tags, images, isFeatured, seriesName, episodeNumber, parentSeries } = await req.json();

    // Validate required fields
    if (!title || !slug || !content || !author || !categories || !tags) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create new blog post
    const newPost = new BlogPost({
      title,
      slug,
      content,
      author,
      categories,
      tags,
      images,
      isFeatured,
      seriesName,
      episodeNumber,
      parentSeries,
    });

    await newPost.save();
    return NextResponse.json({ message: 'Blog post created successfully!', post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 });
  }
};

// PUT (Update a post by slug)
export async function PUT(req) {
  try {
    // Parse the request body
    const updatedData = await req.json();
    console.log("Updated Data: ", updatedData);

    // Ensure slug is provided
    if (!updatedData.slug) {
      return new Response(JSON.stringify({ error: 'Slug is required to update a post' }), {
        status: 400,
      });
    }

    // Find and update the post
    const post = await BlogPost.findOneAndUpdate(
      { slug: updatedData.slug },
      updatedData,
      { new: true }
    );

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
      });
    }

    // Return the updated post
    return new Response(JSON.stringify({ post }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error in PUT request:', err);
    return new Response(JSON.stringify({ error: 'Error updating post', message: err.message }), {
      status: 500,
    });
  }
}

// DELETE a post by slug

export const DELETE = async (req) => {
  try {
    // Parse the request body to get the ID
    const { id } = await req.json();
    console.log("Received request to delete post with ID:", id);  // Log ID

    // Ensure id is provided
    if (!id) {
      console.log("Error: ID not provided in the request.");
      return new NextResponse(
        JSON.stringify({ error: 'ID is required to delete a post' }),
        { status: 400 }
      );
    }

    // Find and delete the post by ID
    const post = await BlogPost.findOneAndDelete({ _id: id });

    // Log the result of the deletion query
    console.log("Post deletion result:", post);

    // If post is not found, return 404 and log the error
    if (!post) {
      console.log(`No post found with ID: ${id}`);
      return new NextResponse(
        JSON.stringify({ error: 'Post not found' }),
        { status: 404 }
      );
    }

    // Return success message if deletion was successful
    return new NextResponse(
      JSON.stringify({ message: 'Post deleted successfully!' }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error in DELETE request:', err);
    return new NextResponse(
      JSON.stringify({ error: 'Error deleting post', message: err.message }),
      { status: 500 }
    );
  }
};

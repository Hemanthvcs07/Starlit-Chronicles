import connectDB from '../../../../../lib/db';
import BlogPost from '../../../../../models/post';
import { NextResponse } from 'next/server';

// Connect to the database
connectDB();

export const GET = async (req, { params }) => {
  // Await the params before using them
  const { category, slug } = await params;

  try {
    // Find a post by category and slug
    const post = await BlogPost.findOne({ categories: category, slug: slug });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post." }, { status: 500 });
  }
};

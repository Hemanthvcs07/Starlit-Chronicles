import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Post from "../../../models/post";

export async function POST(req) {
  await dbConnect();
  
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { message: "Title, content, and author are required." },
        { status: 400 }
      );
    }

    // Ensure slug generation fallback
    body.slug = body.title
      ? body.title.toLowerCase().replace(/[^a-z0-9]/g, "-")
      : "";

    const newPost = new Post(body);
    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully.", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating post.", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await Post.find(); // Fetch all posts
    return NextResponse.json(
      {
        message: "Posts fetched successfully!",
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts.", error: error.message },
      { status: 500 }
    );
  }
}
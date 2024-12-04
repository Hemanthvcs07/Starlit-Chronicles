import { NextResponse } from 'next/server';
import BlogPost from '../../../../models/post'; // Adjust the path as per your project structure
import dbConnect from '../../../../lib/db'; // Ensure you have a DB connection utility

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const { category } = params; // Destructure params directly (no need to await)

  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  await dbConnect(); // Ensure the database is connected

  try {
    // Fetch posts based on the category, ensuring categories is treated as an array
    const posts = await BlogPost.find({ categories: category }).sort({ datePosted: -1 });

    if (posts.length === 0) {
      return NextResponse.json({ message: "No posts found in this category." }, { status: 404 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/user";

// Ensure database connection
connectDB();

// Fetch all users
export const GET = async () => {
  try {
    const users = await User.find({}, "name email role createdAt");

    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();

    // Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Create a new user (password will be automatically hashed in the schema)
    const user = new User({
      name,
      email,
      password, // The password will be automatically hashed by Mongoose schema
    });

    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error in signup route:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

// Edit a user
export const PUT = async (req) => {
  try {
    const { id, name, email, role, password } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Find user by id
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    // If password is provided, it will be hashed by the schema when saved
    if (password) {
      user.password = password; // Just update the password field
    }

    await user.save();

    return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in update route:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};




// Delete a user
export const DELETE = async (req) => {
  try {
    const { id } = await req.json();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
};

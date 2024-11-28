// app/api/users/route.ts
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

// Add a new user (Register a user)
export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const user = new User({ name, email, password });
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
    const { id, name, email, role } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
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

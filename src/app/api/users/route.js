import connectDB from "../../../lib/db";
import User from "../../../models/user";

// Fetch all users
export async function GET(req) {
  try {
    await connectDB();  // Connect to the database

    const users = await User.find({}, "name email role createdAt"); // Fetch all users

    if (!users || users.length === 0) {
      return new Response(JSON.stringify({ message: "No users found" }), { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ message: "Error fetching users" }), { status: 500 });
  }
}

// Edit a user
export async function PUT(req) {
  try {
    await connectDB();

    const { id, name, email, role } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: "Error updating user" }), { status: 500 });
  }
}

// Delete a user
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ message: "Error deleting user" }), { status: 500 });
  }
}

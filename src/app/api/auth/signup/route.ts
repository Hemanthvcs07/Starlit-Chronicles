import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/user";

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
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
}



// import bcrypt from "bcrypt";
// import connectDB from "../../../lib/db"; // Assuming you have a connectDB function
// import User from "../../../models/user"; // Assuming you have a User model

// // API route handler for the signup request
// export async function POST(req) {
//   try {
//     // Parse the JSON body of the request
//     const { username, email, password, role } = await req.json();

//     // Validate the required fields
//     if (!username || !email || !password) {
//       return new Response(
//         JSON.stringify({ message: "All fields are required" }),
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await connectDB();

//     // Check if the user already exists
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (existingUser) {
//       return new Response(
//         JSON.stringify({ message: "User already exists" }),
//         { status: 400 }
//       );
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Validate role or assign default
//     const validRoles = ["Admin", "Author", "User"];
//     const userRole = validRoles.includes(role) ? role : "User";

//     // Create the new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role: userRole,
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Return a success response with username and role
//     return new Response(
//       JSON.stringify({
//         message: "User created successfully",
//         username: newUser.username,
//         role: newUser.role, // Explicitly return role
//       }),
//       { status: 201 }
//     );
//   } catch (error) {
//     // Catch any errors and return a 500 response
//     return new Response(
//       JSON.stringify({ message: "Server error", error: error.message }),
//       { status: 500 }
//     );
//   }
// }
// import User from '../../../models/user'; // Assuming you have a User model
// import connectDB from '../../../lib/db'; // Path to your db connection file

// const signupHandler = async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' }); // Only allow POST requests
//   }

//   const { username, email, password, firstName, lastName, role = 'user' } = req.body;

//   // Validate input data (basic checks)
//   if (!username || !email || !password || !firstName || !lastName) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Connect to the database
//   await connectDB();

//   // Check if the user already exists
//   const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//   if (existingUser) {
//     return res.status(409).json({ message: 'User already exists' });
//   }

//   // Create new user object without hashing password (because it's handled in the schema)
//   const newUser = new User({
//     username,
//     email: email.toLowerCase(),
//     password, // Plain password, will be hashed in the schema
//     firstName,
//     lastName,
//     role,
//   });

//   try {
//     const savedUser = await newUser.save();
//     return res.status(201).json({ message: 'User created successfully', user: savedUser });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error saving user', error: error.message });
//   }
// };

// export default signupHandler;

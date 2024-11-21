import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/user";
import { generateToken } from "../../../../lib/jwt";

export async function POST(req) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check if password matches
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate a JWT token
    const token = generateToken(user);

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import connectDB from "../../../../lib/db";
// import User from "../../../../models/user";

// export async function POST(req) {
//   await connectDB();

//   try {
//     const { email, password } = await req.json();
//     const user = await User.findOne({ email });
//     if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     const isMatch = await user.isPasswordMatch(password);
//     if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     // Create session token
//     const token = Buffer.from(`${user.role}:${user.email}:${user.name}`).toString("base64");
//     const response = NextResponse.json({ message: "Login successful" });

//     // Set token as cookie with 15-second expiry
//     response.cookies.set("authToken", token, { httpOnly: true, maxAge: 15 });

//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import bcrypt from "bcrypt";
// import connectDB from "../../../../lib/db";
// import User from "../../../../models/user";

// // API route handler for login requests
// export async function POST(req) {
//   try {
//     // Log the incoming request (method, headers, body stream info)
//     console.log("Incoming request:", {
//       method: req.method,
//       headers: req.headers,
//     });

//     // Parse request body
//     const requestBody = await req.json();
//     console.log("Parsed request body:", requestBody);

//     const { email, password } = requestBody;

//     // Validate email and password
//     if (!email || !password) {
//       return new Response(
//         JSON.stringify({ message: "Email and password are required" }),
//         { status: 400 }
//       );
//     }

//     // Normalize email to lowercase for consistency
//     const normalizedEmail = email.toLowerCase();
//     console.log("Normalized email:", normalizedEmail);

//     // Connect to the database
//     console.log("Connecting to the database...");
//     await connectDB();

//     // Find user by email (ensure email is lowercase)
//     const user = await User.findOne({ email: normalizedEmail });
//     console.log("User lookup result:", user);

//     if (!user) {
//       return new Response(
//         JSON.stringify({ message: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // Verify password
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     console.log("Password verification result:", isPasswordCorrect);

//     if (!isPasswordCorrect) {
//       return new Response(
//         JSON.stringify({ message: "Invalid credentials" }),
//         { status: 401 }
//       );
//     }

//     // Construct lowercase response data
//     const responseData = {
//       message: "login successful", // Convert message to lowercase
//       username: user.username.toLowerCase(), // Ensure username is lowercase
//       role: user.role.toLowerCase(),         // Ensure role is lowercase
//     };
//     console.log("Response data (lowercase):", responseData);

//     return new Response(JSON.stringify(responseData), { status: 200 });

//   } catch (error) {
//     // Log error details for debugging
//     console.error("Login Error:", error);

//     // Respond with a generic error message
//     return new Response(
//       JSON.stringify({ message: "Server error", error: error.message }),
//       { status: 500 }
//     );
//   }
// }

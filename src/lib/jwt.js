import jwt from "jsonwebtoken";

// Use a proper secret key for JWT, make sure to set this in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Generate a JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, username: user.name }, // Ensure 'username' is correctly passed
    JWT_SECRET,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

// Verify a JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); // Verify the token with the secret
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Invalid or expired token
  }
};

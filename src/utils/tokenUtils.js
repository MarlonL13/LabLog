import jwt from "jsonwebtoken";

// Function to generate access and refresh tokens
export const generateTokens = (user) => {
  // Generate Access Token
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

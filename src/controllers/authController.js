import { authServices } from "../services/authServices.js";

// Handle user login: validates credentials and returns access/refresh tokens
export const login = async (req, res) => {
  const { registration_number, password } = req.body;
  try {
    // Authenticate user and generate tokens
    const { accessToken, refreshToken } = await authServices.authenticateUser(
      registration_number,
      password
    );

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevent JavaScript access to cookie
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Protect against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token in response
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to refresh the access token
export const refreshAccessToken = async (req, res) => {
  try {
    // Get refresh token from cookies
    const refreshToken = req.cookies.refreshToken;

    // Check if refresh token exists
    if (!refreshToken) {
      return res.status(403).json({ error: "No refresh token provided" });
    }

    // Generate new access token and refresh token
    const { accessToken, newRefreshToken } =
      await authServices.refreshAccessToken(refreshToken);

    // Set new refresh token as HTTP-only cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send new access token to client
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict",
      expires: new Date(0), // Expire the cookie immediately
    });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

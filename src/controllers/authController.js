import { authServices } from "../services/authServices.js";

export const login = async (req, res) => {
  const { registration_number, password } = req.body;
  try {
    const { accessToken, refreshToken } = await authServices.authenticateUser(
      registration_number,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ error: "No refresh token provided" });
    }

    const { accessToken, newRefreshToken } =
      await authServices.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  try{
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

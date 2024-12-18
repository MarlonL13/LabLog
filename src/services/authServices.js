import { User } from "../models/index.js";
import { generateTokens } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import bcryp from "bcrypt";

const authenticateUser = async (registration_number, password) => {
  try {
    const user = await User.findOne({ where: { registration_number } });
    if (!user) {
      throw new Error("invalid user");
    }

    const isPasswordValid = await bcryp.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const { accessToken, refreshToken } = generateTokens(user);

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(err.message);
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    return { accessToken, newRefreshToken };
  } catch {
    throw new Error("Invalid refresh token");
  }
};


export const authServices = {
  authenticateUser,
  refreshAccessToken,
};

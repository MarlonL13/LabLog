import { User } from "../models/index.js";
import { generateTokens } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import bcryp from "bcrypt";

/**
 * Authenticates a user with their registration number and password
 * 
 * @async
 * @param {string} registration_number - The user's registration number
 * @param {string} password - The user's password
 * @returns {Promise<Object>} Object containing access and refresh tokens
 * @property {string} accessToken - JWT access token
 * @property {string} refreshToken - JWT refresh token
 * @throws {Error} If user is not found or password is invalid
 */
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

/**
 * Refreshes the access token using a refresh token.
 * 
 * @async
 * @param {string} refreshToken - The refresh token used to generate new tokens.
 * @returns {Promise<Object>} An object containing the new access token and refresh token.
 * @property {string} returns.accessToken - The newly generated access token.
 * @property {string} returns.newRefreshToken - The newly generated refresh token.
 * @throws {Error} If the refresh token is invalid.
 */
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

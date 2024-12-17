import { User } from "../models/index.js";
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
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const authServices = {
  authenticateUser,
};

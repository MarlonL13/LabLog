import { Op } from "sequelize";
import { createRecord, updateRecord } from "./commonServices.js";
import { User } from "../models/index.js";
import { passwordUtils } from "../utils/passwordUtils.js";
import bcrypt from "bcrypt";

/**
 * Creates a new user record in the database
 * 
 * @async
 * @param {Object} body - The request body containing user information
 * @param {string} body.name - The full name of the user (must contain at least two words)
 * @param {Object} body - Additional user data to be stored
 * @throws {Error} If name has less than two words
 * @throws {Error} If name contains numbers or invalid characters
 * @returns {Promise<Object>} The created user record
 */
const createUser = async (body) => {
  body.name = body.name.trim();
  const namesArray = body.name.split(" ");
  if (namesArray.length < 2) {
    throw new Error("Name should have at least two words.");
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(body.name)) {
    throw new Error("Name should not contain numbers or invalid characters.");
  }
  const defaultPassword = passwordUtils.genereatePassword(body);
  body.password = await bcrypt.hash(defaultPassword, 10);
  return await createRecord(User, body);
};


const getUserById = async (userId) => {
  const userData = await User.findByPk(userId, {
    attributes: {
      exclude: ["id"],
    },
  });
  return userData;
};

const updateUser = async (userId, body) => {
  if (body.password) {
    throw new Error("Password updates are not allowed through this route.");
  }
  return await updateRecord(User, userId, body);
};

/**
 * Searches for users based on name and role criteria
 * 
 * @async
 * @param {Object} query - The search query parameters
 * @param {string} [query.name] - Optional name to search for (case insensitive partial match)
 * @param {string} [query.role] - Optional role to filter by (exact match)
 * @returns {Promise<Array<{id: number, name: string}>>} Array of matching user objects with id and name
 */
export const searchUsers = async (query) => {
  const { name, role } = query;
  const whereConditions = {};
  if (name) {
    whereConditions.name = {
      [Op.iLike]: `%${name}%`,
    };
  }
  if (role) {
    whereConditions.role = role;
  }
  const users = await User.findAll({
    where: whereConditions,
    attributes: ["id", "name"],
  });
  return users;
};

export const userServices = {
  createUser,
  getUserById,
  updateUser,
  searchUsers,
};

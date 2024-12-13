import { Op } from "sequelize";
import { createRecord, updateRecord } from "./commonServices.js";
import { User } from "../models/index.js";

const createUser = async (body) => {
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
  return await updateRecord(User, userId, body);
};

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
    attributes: ["id", "name"]
  });
  return users;
};

export const userServices = {
  createUser,
  getUserById,
  updateUser,
  searchUsers,
};

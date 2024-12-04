import { User } from "../models/index.js";
import { Op } from "sequelize";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findByPk(userId);
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const [update] = await User.update(req.body, { where: { id: userId } });
    if (update) {
      res.status(200).json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

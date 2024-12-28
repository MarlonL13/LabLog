import { userServices } from "../services/userServices.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await userServices.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const field = err.errors[0].path; // Get the field causing the unique constraint violation
      const value = err.errors[0].value; // Get the conflicting value
      return res.status(409).json({
        message: `The ${field} '${value}' is already in use. Please choose a different value.`,
      });
    }
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userData = await userServices.getUserById(req.params.id);
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.body.password || req.body.registration_number) {
      res.status(403).json({
        message: "Password and registration number cannot be changed",
      });
    }
    const update = await userServices.updateUser(req.params.id, req.body);
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
    const users = await userServices.searchUsers(req.query);
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

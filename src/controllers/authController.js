import { authServices } from "../services/authServices.js";

export const login = async (req, res) => {
  const { registration_number, password } = req.body;
  try {
    const token = await authServices.authenticateUser(registration_number, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

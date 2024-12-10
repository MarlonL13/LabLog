import { Equipment } from "../models/index.js";

export const getAllEquipment = async (req, res) => {
  try {
    const { status } = req.query;
    const whereConditions = {};
    if (status) {
      whereConditions.status = status;
    }
    const users = await Equipment.findAll({
      where: whereConditions,
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

export const createEquipment = async (req, res) => {
    try {
      const newEquipment = await Equipment.create(req.body);
      res.status(201).json(newEquipment);
    } catch (err) {
      res.status(500).json({ message: `${err.name}: ${err.message}` });
    }
  };

  export const updateEquipment = async (req, res) => {
    try {
      const equipmentId = req.params.id;
      const [update] = await Equipment.update(req.body, { where: { id: equipmentId } });
      if (update) {
        res.status(200).json({ message: "Equipment updated" });
      } else {
        res.status(404).json({ message: "Equipment not found" });
      }
    } catch (err) {
      res.status(500).json({ message: `${err.name}: ${err.message}` });
    }
  };
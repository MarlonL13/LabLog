import { equipmentServices } from "../services/equipmentServices.js";

export const createEquipment = async (req, res) => {
  try {
    const newEquipment = await equipmentServices.createEquipment(req.body);
    res.status(201).json(newEquipment);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await equipmentServices.getAllEquipment(
      req.query.status
    );
    if (equipment.length > 0) {
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ message: "No equipment found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const update = await equipmentServices.updateEquipment(
      req.params.id,
      req.body
    );
    if (update) {
      res.status(200).json({ message: "Equipment updated" });
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

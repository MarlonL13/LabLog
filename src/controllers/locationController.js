import { Location } from "../models/index.js";

export const createLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchLocation = async (req, res) => {
  try {
    const { laboratory } = req.params;
    const locations = await Location.findAll({
      where: {
        laboratory: laboratory,
      },
    });

    if (locations.length > 0) {
      res.status(200).json(locations);
    } else {
      res.status(404).json({ message: "No location found" });
    }
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id);
    await location.destroy();

    res.status(200).json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

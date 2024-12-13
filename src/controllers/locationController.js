import { locationServices } from "../services/locationSevices.js";

export const createLocation = async (req, res) => {
  try {
    const newLocation = await locationServices.createLocation(req.body);
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchLocation = async (req, res) => {
  try {
    const locations = await locationServices.searchLocation(req.params.laboratory);
    if (locations.length > 0) {
      res.status(200).json(locations);
    } else {
      res.status(404).json({ message: "No location found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await locationServices.deleteLocation(req.params.id);
    res.status(200).json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

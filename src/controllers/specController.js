import { specServices } from "../services/specServices.js";

export const createSpec = async (req, res) => {
  try {
    const newSpec = await specServices.createSpec(req.body);
    res.status(201).json(newSpec);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const updateSpec = async (req, res) => {
  try {
    const update = await specServices.updateSpec(req.params.id, req.body);
    if (update) {
      res.status(200).json({ message: "Product spec updated" });
    } else {
      res.status(404).json({ message: "Product spec not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getSpectById = async (req, res) => {
  try {
    const spectData = await specServices.getSpectById(req.params.id);
    if (spectData) {
      res.status(200).json(spectData);
    } else {
      res.status(404).json({ message: "Product spec not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchSpec = async (req, res) => {
  try {
    const specs = await specServices.searchSpec(req.query.name);
    if (specs.length > 0) {
      res.status(200).json(specs);
    } else {
      res.status(404).json({ message: "No product specs found" });
    }
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

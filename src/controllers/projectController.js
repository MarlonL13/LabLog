import { projectServices } from "../services/projectServices.js";
import sequelize from "../config/connection.js";

export const createProject = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const newProject = await projectServices.createProject(req.body, t);
    await t.commit();
    res.status(201).json(newProject);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchProject = async (req, res) => {
  try {
    const projects = await projectServices.searchProject(req.query.name);
    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "No projects found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const updateProject = async (req, res) => {
  try {
    // First, update the project itself
    const update = await projectServices.updateProject(req.params.id, req.body)
    if (update){
      res.status(200).json({ message: "Project updated successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const projectData = await projectServices.getProjectById(req.params.id);
    if (projectData) {
      res.status(200).json(projectData);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getActiveProjects = async (req, res) => {
  try {
    const projects = await projectServices.getActiveProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

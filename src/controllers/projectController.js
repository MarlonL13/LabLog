import { Op } from "sequelize";
import sequelize from "../config/connection.js";
import {
  Product,
  ProductSpec,
  Project,
  ProjectParticipant,
  User,
} from "../models/index.js";
import ProjectParticipants from "../models/ProjectParticipant.js";

export const createProject = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { participants, ...projectData } = req.body;
    const newProject = await Project.create(projectData, { transaction: t });

    if (participants && participants.length > 0) {
      const projectId = newProject.id;
      await ProjectParticipants.bulkCreate(
        participants.map((p) => ({
          project_id: projectId,
          user_id: p.user_id,
          is_coordinator: p.is_coordinator,
        })),
        { transaction: t }
      );
    }
    await t.commit();
    res.status(201).json(newProject);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchProject = async (req, res) => {
  try {
    const { name } = req.query;
    const projects = await Project.findAll({
      where: {
        status: "active",
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: {
        exclude: ["id", "status"],
      },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["name"],
        },
      ],
    });
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
    const projectId = req.params.id;
    const { participants } = req.body;

    // First, update the project itself
    const [update] = await Project.update(req.body, {
      where: { id: projectId },
    });
    // If project is updated successfully
    if (update) {
      if (participants) {
        const project = await Project.findByPk(projectId, {
          include: {
            model: User,
            as: "users", // Assuming 'users' is the alias in your association
            attributes: ["id"],
            through: { attributes: ["is_coordinator"] }, // Include the 'is_coordinator' field
          },
        });

        // Get the current user IDs already associated with the project
        const currentParticipants = project.users.map((user) => user.id);

        // Find participants to add (those that are not currently associated with the project)
        const participantsToAdd = participants.filter(
          (p) => !currentParticipants.includes(p.user_id)
        );

        // Find participants to remove (those that are no longer in the request)
        const participantsToRemove = currentParticipants.filter(
          (userId) => !participants.map((p) => p.user_id).includes(userId)
        );

        // Add new participants to the project
        if (participantsToAdd.length > 0) {
          // Ensure each participant is added with correct attributes (this ensures you're passing valid data)
          const addParticipantsData = participantsToAdd.map((p) => ({
            project_id: projectId,
            user_id: p.user_id, // Ensure this is the correct user ID
            is_coordinator: p.is_coordinator, // Ensure this matches the column name
          }));

          await ProjectParticipant.bulkCreate(addParticipantsData, {
            updateOnDuplicate: ["is_coordinator"], // Update the 'is_coordinator' flag if already exists
          });
        }

        // Remove participants that are no longer part of the project
        if (participantsToRemove.length > 0) {
          await project.removeUsers(participantsToRemove);
        }

        // Now, update the `is_coordinator` flag for existing participants
        for (const participant of participants) {
          // Update or create the `ProjectParticipant` association
          await ProjectParticipant.upsert({
            project_id: projectId,
            user_id: participant.user_id,
            is_coordinator: participant.is_coordinator,
          });
        }

        res
          .status(200)
          .json({ message: "Project updated and participants managed" });
      } else {
        res.status(200).json({ message: "Project updated" });
      }
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectData = await Project.findByPk(projectId, {
      attributes: {
        exclude: ["id", "status"],
      },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["name"],
        },
        {
          model: Product,
          as: "products",
          attributes: ["id"],
          include: [
            {
              model: ProductSpec,
              as: "product_spec",
              attributes: ["name", "abbreviation", "supplier"],
            },
          ],
        },
      ],
    });
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
    const projects = await Project.findAll({
      where: {
        status: "active",
      },
      attributes: {
        exclude: ["id", "status"],
      },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

import {
  Product,
  ProductSpec,
  Project,
  ProjectParticipant,
  User,
} from "../models/index.js";
import { Op } from "sequelize";

const createProject = async (body, t) => {
  const { participants, ...projectData } = body;
  const newProject = await Project.create(projectData, { transaction: t });

  if (participants && participants.length > 0) {
    const projectId = newProject.id;
    await ProjectParticipant.bulkCreate(
      participants.map((p) => ({
        project_id: projectId,
        user_id: p.user_id,
        is_coordinator: p.is_coordinator,
      })),
      { transaction: t }
    );
  }
  return newProject;
};

const searchProject = async (query) => {
  const projects = await Project.findAll({
    where: {
      status: "active",
      name: {
        [Op.iLike]: `%${query}%`,
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
        through: { attributes: ["is_coordinator"] },
      },
    ],
  });
  return projects;
};

const updateProject = async (projectId, body) => {
  // First, update the project itself
  const update = await Project.update(body, {
    where: { id: projectId },
  });
  // If project is updated successfully
  if (update) {
    if (body.participants) {
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
      const participantsToAdd = body.participants.filter(
        (p) => !currentParticipants.includes(p.user_id)
      );

      // Find participants to remove (those that are no longer in the request)
      const participantsToRemove = currentParticipants.filter(
        (userId) => !body.participants.map((p) => p.user_id).includes(userId)
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
      for (const participant of body.participants) {
        // Update or create the `ProjectParticipant` association
        await ProjectParticipant.upsert({
          project_id: projectId,
          user_id: participant.user_id,
          is_coordinator: participant.is_coordinator,
        });
      }
    }
  }
  return update;
};

const getProjectById = async (projectId) => {
  const projectData = await Project.findByPk(projectId, {
    attributes: {
      exclude: ["id", "status"],
    },
    include: [
      {
        model: User,
        as: "users",
        attributes: ["name"],
        through: { attributes: ["is_coordinator"] },
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
  return projectData;
};

const getActiveProjects = async () => {
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
        through: { attributes: ["is_coordinator"] },
      },
    ],
  });
  return projects;
};

export const projectServices = {
  createProject,
  searchProject,
  updateProject,
  getProjectById,
  getActiveProjects,
};

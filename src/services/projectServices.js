import {
  Product,
  ProductSpec,
  Project,
  ProjectParticipant,
  User,
} from "../models/index.js";
import { removeWhiteSpace } from "../utils/scriptUtils.js";
import { Op } from "sequelize";

/**
 * Creates a new project and associates participants with it.
 * 
 * @async
 * @param {Object} body - The data for the new project.
 * @param {Array} body.participants - The participants to be associated with the project.
 * @param {Object} body.projectData - The data for the project excluding participants.
 * @param {Object} t - The transaction object for the database operation.
 * @returns {Promise<Object>} The newly created project.
 * @throws {Error} If the database operation fails.
 */
const createProject = async (body, t) => {
  let { participants, ...projectData } = body;
  projectData = removeWhiteSpace(projectData);
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
      exclude: ["status"],
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

/**
 * Updates a project and its participants in the database.
 * 
 * @async
 * @param {number|string} projectId - The ID of the project to update
 * @param {Object} body - The project update data
 * @param {Object[]} [body.participants] - Array of participant objects to update/add
 * @param {number|string} body.participants[].user_id - User ID of the participant
 * @param {boolean} body.participants[].is_coordinator - Whether the participant is a coordinator
 * @returns {Promise<Array>} Result of the project update operation
 * 
 * @description
 * This function performs the following operations:
 * 1. Updates the project's main information
 * 2. If participants are included in the update:
 *    - Adds new participants
 *    - Removes participants no longer associated
 *    - Updates coordinator status for existing participants
 * 
 * @throws {Error} If database operations fail
 */
const updateProject = async (projectId, body) => {
  // First, update the project itself
  body = removeWhiteSpace(body);
  const update = await Project.update(body, {
    where: { id: projectId },
  });
  // If project is updated successfully
  if (update) {
    if (body.participants) {
      const project = await Project.findByPk(projectId, {
        include: {
          model: User,
          as: "users",
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
        // Adding the new participants to the project
        const addParticipantsData = participantsToAdd.map((p) => ({
          project_id: projectId,
          user_id: p.user_id,
          is_coordinator: p.is_coordinator,
        }));

        await ProjectParticipant.bulkCreate(addParticipantsData, {
          updateOnDuplicate: ["is_coordinator"], // Update the 'is_coordinator' flag if already exists
        });
      }

      // Remove participants that are no longer part of the project
      if (participantsToRemove.length > 0) {
        await project.removeUsers(participantsToRemove);
      }

      // update coordinator status for existing participants
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
      exclude: ["status"],
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

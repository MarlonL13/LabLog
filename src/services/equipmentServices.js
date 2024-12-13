import { Equipment } from "../models/index.js";
import { createRecord, updateRecord } from "./commonServices.js";

const createEquipment = async (body) => {
  return await createRecord(Equipment, body);
};

const getAllEquipment = async (status = null) => {
  const whereConditions = {};
  if (status) {
    whereConditions.status = status;
  }
  const equipment = await Equipment.findAll({
    where: whereConditions,
  });
  return equipment;
};

const updateEquipment = async (equipmentId, body) => {
  return await updateRecord(Equipment, equipmentId, body);
};

export const equipmentServices = {
  createEquipment,
  getAllEquipment,
  updateEquipment,
};

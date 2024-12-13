import { Location } from "../models/index.js";
import { createRecord, deleteRecord } from "./commonServices.js";

const createLocation = async (body) => {
  return await createRecord(Location, body);
};

const searchLocation = async (laboratory) => {
  const locations = await Location.findAll({
    where: {
      laboratory: laboratory,
    },
  });
  return locations;
};

const deleteLocation = async (locationId) => {
  return await deleteRecord(Location, locationId);
};

export const locationServices = {
  createLocation,
  searchLocation,
  deleteLocation,
};

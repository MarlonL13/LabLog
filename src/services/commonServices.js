import { removeWhiteSpace } from "../utils/scriptUtils.js";

export const createRecord = async (Model, body) => {
  body = removeWhiteSpace(body);
  const newRecord = await Model.create(body);
  return newRecord;
};

export const updateRecord = async (Model, id, body) => {
  body = removeWhiteSpace(body);
  const [update] = await Model.update(body, { where: { id: id } });
  return update;
};

export const deleteRecord = async (Model, id) => {
  const record = await Model.findByPk(id);
  await record.destroy();
};

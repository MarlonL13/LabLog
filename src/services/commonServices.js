export const createRecord = async (Model, body) => {
    const newUser = await Model.create(body);
    return newUser;
  };

export const updateRecord = async (Model, id, body) => {
    const update = await Model.update(body, { where: { id: id } });
    return update;
  };

export const deleteRecord = async (Model, id) => {
    const location = await Model.findByPk(id);
    await location.destroy();
  };
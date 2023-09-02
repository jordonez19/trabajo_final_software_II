import RolesModel from "../../models/roles";

export const createRoles = async () => {
  try {
    const count = await RolesModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new RolesModel({ name: "user" }).save(),
      new RolesModel({ name: "moderator" }).save(),
      new RolesModel({ name: "admin" }).save(),
    ]);

    console.log('Init Values Started: ',values);

  } catch (error) {
    console.error(error);
  }
};
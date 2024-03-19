import { models } from "../initDB.js";

const Admin = models.Admin;

export async function createAdmin(adminDetails) {
  try {
    const admin = await Admin.create({ ...adminDetails });

    return admin;
  } catch (err) {
    throw err;
  }
}

export async function getAll() {
  try {
    const admins = await Admin.findAll();

    return admins;
  } catch (err) {
    throw err;
  }
}

export async function getAdminByAdminId(mid) {
  try {
    const admin = await Admin.findOne({
      where: { adminId: mid },
    });

    return admin;
  } catch (err) {
    throw err;
  }
}

import { getAll } from "../../database/repositories/AdminRepo.js";

export async function getAllAdmin() {
  try {
    const admins = await getAll();

    return admins;
  } catch (err) {
    throw err;
  }
}

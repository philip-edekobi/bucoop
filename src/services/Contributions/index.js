import { getAllContributions as AllCon } from "../../database/repositories/ContributionRepo.js";

export async function getAllContributions() {
  try {
    const contribs = await AllCon();

    return contribs;
  } catch (err) {
    throw err;
  }
}

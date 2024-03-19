import { models } from "../initDB.js";

const C = models.Contribution;

export async function createContribution(contribDetails) {
  try {
    const contrib = await C.create({ ...contribDetails });

    return contrib;
  } catch (err) {
    throw err;
  }
}

export async function getAllContributions() {
  try {
    const contribs = await C.findAll();

    return contribs;
  } catch (err) {
    throw err;
  }
}

export async function getContributionsByMemberId(mid) {
  try {
    const contribs = await C.findAll({ where: { staffID: mid } });

    return contribs;
  } catch (err) {
    throw err;
  }
}

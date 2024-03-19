import {
  createContribution,
  getContributionsByMemberId,
} from "../../database/repositories/ContributionRepo.js";
import { getMemberByMemberId } from "../../database/repositories/MemberRepo.js";

export async function createContributionForUser(memberId, details) {
  try {
    const user = await getMemberByMemberId(memberId);
    details.staffID = user.id;

    const contribution = await createContribution(details);

    return contribution;
  } catch (err) {
    throw err;
  }
}

export async function getMemberContributions(memberId) {
  try {
    const user = await getMemberByMemberId(memberId);
    const contributions = getContributionsByMemberId(user.id);

    return contributions;
  } catch (err) {
    throw err;
  }
}

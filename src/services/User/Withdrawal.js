import {
  createWithdrawal,
  getAllWithdrawalsByMemberId,
} from "../../database/repositories/WithdrawalRepo.js";
import { getMemberByMemberId } from "../../database/repositories/MemberRepo.js";

export async function createWithdrawalForUser(memberId, details) {
  try {
    const user = await getMemberByMemberId(memberId);
    details.staffID = user.id;

    const contribution = await createWithdrawal(details);

    return contribution;
  } catch (err) {
    throw err;
  }
}

export async function getMemberWithdrawals(memberId) {
  try {
    const user = await getMemberByMemberId(memberId);
    const contributions = getAllWithdrawalsByMemberId(user.id);

    return contributions;
  } catch (err) {
    throw err;
  }
}

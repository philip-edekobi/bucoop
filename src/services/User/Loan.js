import {
  createLoan,
  getLoansByMemberId,
} from "../../database/repositories/LoanRepo.js";
import { getMemberByMemberId } from "../../database/repositories/MemberRepo.js";

export async function createLoanForUser(memberId, details) {
  try {
    const user = await getMemberByMemberId(memberId);
    details.staffID = user.id;

    const loan = await createLoan(details);

    return loan;
  } catch (err) {
    throw err;
  }
}

export async function getMemberLoans(memberId) {
  try {
    const user = await getMemberByMemberId(memberId);
    const loans = getLoansByMemberId(user.id);

    return loans;
  } catch (err) {
    throw err;
  }
}

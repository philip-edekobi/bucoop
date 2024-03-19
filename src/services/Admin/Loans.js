import { createLoanType } from "../../database/repositories/LoanRepo.js";

export async function addLoanType(loanType) {
  try {
    const lt = await createLoanType({ loanType });

    return lt;
  } catch (err) {
    throw err;
  }
}

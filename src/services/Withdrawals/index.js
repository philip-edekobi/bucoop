import { getAllWithdrawals } from "../../database/repositories/WithdrawalRepo.js";

export async function AllWithdrawals() {
  try {
    const wds = await getAllWithdrawals();

    return wds;
  } catch (err) {
    throw err;
  }
}

import { models } from "../initDB.js";

const W = models.Withdrawal;

export async function createWithdrawal(withdrawalDetails) {
  try {
    const wd = W.create({ ...withdrawalDetails });

    return wd;
  } catch (err) {
    throw err;
  }
}

export async function getAllWithdrawals() {
  try {
    const wds = await W.findAll();

    return wds;
  } catch (err) {
    throw err;
  }
}

export async function getAllWithdrawalsByMemberId(mid) {
  try {
    const wds = await W.findAll({ where: { staffID: mid } });

    return wds;
  } catch (err) {
    throw err;
  }
}

import { httpResp, errResp } from "../utils/http.js";
import { AllWithdrawals } from "../services/Withdrawals/index.js";

export async function allWd(_, res) {
  try {
    const withdrawals = await AllWithdrawals();

    return httpResp(200, { withdrawals }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

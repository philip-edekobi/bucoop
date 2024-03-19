import { errResp, httpResp } from "../utils/http.js";
import { getAllLoans, changeLoanStat } from "../services/Loan/index.js";
import { ChangeLoanSchema } from "../validations/index.js";

export async function getLoans(_, res) {
  try {
    const loans = await getAllLoans();

    return httpResp(200, { loans }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function modifyLoan(req, res) {
  try {
    const { error } = ChangeLoanSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    const loan = await changeLoanStat(req.params.id, req.body.status);

    return httpResp(200, { loan }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

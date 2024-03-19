import { errResp, httpResp } from "../utils/http.js";
import { NewLoanTypeSchema } from "../validations/index.js";
import { addLoanType } from "../services/Admin/Loans.js";
import { allLoanTypes } from "../services/Loan/index.js";

export async function createLT(req, res) {
  try {
    const { error } = NewLoanTypeSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    let loanType = await addLoanType(req.body.name);

    return httpResp(201, { loanType }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function allLT(_, res) {
  try {
    const loanTypes = await allLoanTypes();

    return httpResp(200, { loanTypes }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

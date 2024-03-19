import { generateToken } from "../utils/token.js";
import {
  LoginSchema,
  UpdateMemberSchema,
  CreateMemberSchema,
  RequestLoanSchema,
  WithdrawalSchema,
  ContributionSchema,
  PasswordChangeSchema,
  ModifyContributionSchema,
} from "../validations/index.js";
import {
  memberCreate,
  loginMember,
  modifyUser as changeUser,
  changeUserPassword,
} from "../services/User/Access.js";
import { getAllUsers as membersAll } from "../services/Admin/Users.js";
import { createLoanForUser, getMemberLoans } from "../services/User/Loan.js";
import {
  createContributionForUser,
  getMemberContributions,
} from "../services/User/Contribution.js";
import {
  createWithdrawalForUser,
  getMemberWithdrawals,
} from "../services/User/Withdrawal.js";
import { approveUser } from "../services/Admin/Users.js";
import { errResp, httpResp } from "../utils/http.js";

export async function allUsers(_, res) {
  try {
    const members = await membersAll();

    return httpResp(200, { members }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function newUser(req, res) {
  try {
    const { error } = CreateMemberSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    let mem = await memberCreate(req.body);
    mem = { ...mem.dataValues, passwordHash: undefined };

    return httpResp(201, { member: mem }, res);
  } catch (err) {
    console.error(err);
    return errResp(500, err, res);
  }
}

export async function loginUser(req, res) {
  try {
    const { error } = LoginSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    const userValid = await loginMember(req.body);

    if (!userValid) {
      return errResp(404, { message: "user not found" }, res);
    }

    const token = generateToken({
      memberId: req.body.memberId,
      type: "member",
    });

    return httpResp(200, { token }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function modifyUser(req, res) {
  try {
    const { error } = UpdateMemberSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    const member = await changeUser(req.user.memberId, req.body);

    return httpResp(200, { member }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

export async function newLoan(req, res) {
  try {
    const { error } = RequestLoanSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    let loan = await createLoanForUser(req.user.memberId, req.body);

    return httpResp(200, { loan }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function memLoan(req, res) {
  try {
    const loans = await getMemberLoans(req.user.memberId);

    return httpResp(200, { loans }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

export async function newWithdrawal(req, res) {
  try {
    const { error } = WithdrawalSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    let withdrawal = await createWithdrawalForUser(req.user.memberId, req.body);

    return httpResp(200, { withdrawal }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function memWith(req, res) {
  try {
    const withdrawals = await getMemberWithdrawals(req.user.memberId);

    return httpResp(200, { withdrawals }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function newContrib(req, res) {
  try {
    const { error } = ContributionSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    let contribution = await createContributionForUser(
      req.user.memberId,
      req.body,
    );

    return httpResp(200, { contribution }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function memContrib(req, res) {
  try {
    const contributions = await getMemberContributions(req.user.memberId);

    return httpResp(200, { contributions }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

export async function password(req, res) {
  try {
    const { error } = PasswordChangeSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    const successfulChange = await changeUserPassword(
      req.user.memberId,
      req.body,
    );

    if (!successfulChange) {
      return errResp(404, { message: "wrong password" }, res);
    }

    return httpResp(200, { message: "password changed successfully" }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function approveMem(req, res) {
  try {
    if (!req.params.id) {
      return errResp(400, { message: "requires id param" }, res);
    }

    const member = await approveUser(req.params.id);

    return httpResp(200, { member }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

export async function changeContrib(req, res) {
  try {
    const { error } = ModifyContributionSchema.validate(req.body);

    if (error) {
      return errResp(400, error, res);
    }

    await changeUser(req.user.memberId, {
      contribution: req.body.newBalance,
    });

    return httpResp(200, {}, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

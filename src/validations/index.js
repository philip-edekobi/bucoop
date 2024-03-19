import Joi from "joi";

export const LoginSchema = Joi.object({
  memberId: Joi.string().required(),
  password: Joi.string().required(),
});

export const CreateAdminSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  adminId: Joi.string().required(),
  role: Joi.string()
    .valid("PayrollManager", "AccountOfficer", "Chairman")
    .required(),
});

export const CreateMemberSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  staffId: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  contribution: Joi.number().required(),
});

export const UpdateMemberSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string(),
});

export const PasswordChangeSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const WithdrawalSchema = Joi.object({
  amount: Joi.number().required(),
  purpose: Joi.string().required(),
});

export const RequestLoanSchema = Joi.object({
  amount: Joi.number().required(),
  duration: Joi.number().required(), // in months
  type: Joi.string().required(),
  repaymentCycle: Joi.string()
    .valid("Daily", "Weekly", "Bi-Weekly", "Monthly", "Manually")
    .required(),
  // disbursementDate: Joi.date().required(),
  reason: Joi.string().required(),
});

export const ChangeLoanSchema = Joi.object({
  status: Joi.string().valid("Accepted", "Rejected").required(),
});

export const ContributionSchema = Joi.object({
  balance: Joi.number().required(),
});

export const ModifyContributionSchema = Joi.object({
  newBalance: Joi.number().required(),
});

export const NewLoanTypeSchema = Joi.object({
  name: Joi.string().required(),
});

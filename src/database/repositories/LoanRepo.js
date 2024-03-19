import { models } from "../initDB.js";

const Loan = models.Loan;
const LT = models.LoanType;

export async function createLoan(loanDetails) {
  try {
    const loan = await Loan.create({ ...loanDetails });

    return loan;
  } catch (err) {
    throw err;
  }
}

export async function createLoanType(ltDetails) {
  try {
    const lt = await LT.create({ ...ltDetails });

    return lt;
  } catch (err) {
    throw err;
  }
}

export async function getAllLoans() {
  try {
    const loans = await Loan.findAll();

    return loans;
  } catch (err) {
    throw err;
  }
}

export async function getAllLoanTypes() {
  try {
    const lt = await LT.findAll();

    return lt;
  } catch (err) {
    throw err;
  }
}

export async function getLoansByMemberId(mid) {
  try {
    const loans = await Loan.findAll({ where: { staffID: mid } });

    return loans;
  } catch (err) {
    throw err;
  }
}

export async function changeLoanStatus(lid, newStatus) {
  try {
    let loans = await Loan.update(
      { status: newStatus },
      {
        where: { id: lid },
        returning: true,
        plain: true,
      },
    );

    loans = loans.filter((loan) => loan && loan.dataValues.id !== lid);

    return loans[0];
  } catch (err) {
    throw err;
  }
}

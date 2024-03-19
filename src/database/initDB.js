import { Sequelize, DataTypes } from "sequelize";
import loadAdmin from "./models/Admin.js";
import loadContribution from "./models/Contribution.js";
import loadMember from "./models/Member.js";
import loadWithdrawal from "./models/Withdrawal.js";
import loadLoan from "./models/Loan.js";
import loadLoanType from "./models/LoanType.js";

const sequelize = new Sequelize("bucoop", "bucoop", "bucoop", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

async function testConn() {
  try {
    await sequelize.authenticate();
    console.log("DB connection successful");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const Member = loadMember(sequelize, DataTypes);
const Admin = loadAdmin(sequelize, DataTypes);
const LoanType = loadLoanType(sequelize, DataTypes);
const Loan = loadLoan(sequelize, DataTypes);
const Withdrawal = loadWithdrawal(sequelize, DataTypes);
const Contribution = loadContribution(sequelize, DataTypes);

const models = { Member, Admin, Loan, LoanType, Withdrawal, Contribution };

export { sequelize, models, testConn };

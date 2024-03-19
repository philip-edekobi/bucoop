import { Deferrable } from "sequelize";

export default function (sequelize, DataTypes) {
  const Loan = sequelize.define(
    "Loan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      staffID: {
        field: "staff_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: sequelize.models.Member,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      duration: {
        allowNull: false,
        type: DataTypes.INTEGER,
        comment: "in months",
      },
      repaymentCycle: {
        field: "repayment_cycle",
        type: DataTypes.ENUM(
          "Daily",
          "Weekly",
          "Bi-Weekly",
          "Monthly",
          "Manually",
        ),
        allowNull: false,
      },
      // disbursementDate: {
      //   field: "disbursement_date",
      //   allowNull: false,
      //   type: DataTypes.DATEONLY,
      // },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: sequelize.models.LoanType,
          key: "loan_type",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Accepted", "Rejected", "Pending"),
        allowNull: false,
        defaultValue: "Pending",
      },
    },
    { tableName: "loans" },
  );

  return Loan;
}

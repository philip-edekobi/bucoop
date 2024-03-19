export default function (sequelize, DataTypes) {
  const LT = sequelize.define(
    "LoanType",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      loanType: {
        field: "loan_type",
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
    },
    { tableName: "loan_types" },
  );

  return LT;
}

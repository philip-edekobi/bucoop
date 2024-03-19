import { Deferrable } from "sequelize";

export default function (sequelize, DataTypes) {
  const W = sequelize.define(
    "Withdrawal",
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
      purpose: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("Approved", "Rejected", "Pending"),
        allowNull: false,
        defaultValue: "Pending",
      },
    },
    { tableName: "withdrawals" },
  );

  return W;
}

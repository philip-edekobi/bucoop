import { Deferrable } from "sequelize";

export default function (sequelize, DataTypes) {
  const Contrib = sequelize.define(
    "Contribution",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      staffID: {
        field: "staff_id",
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: sequelize.models.Member,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
    },
    { tableName: "contributions" },
  );

  return Contrib;
}

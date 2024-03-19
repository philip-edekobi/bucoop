export default function (sequelize, DataTypes) {
  const Member = sequelize.define(
    "Member",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memberId: {
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      staffId: {
        field: "staff_id",
        allowNull: false,
        type: DataTypes.STRING,
      },
      registrationStatus: {
        allowNull: false,
        field: "registration_status",
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      contribution: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      passwordHash: {
        field: "password_hash",
        allowNull: false,
        type: DataTypes.STRING,
      },
      profileURL: {
        field: "profile_url",
        type: DataTypes.STRING,
      },
    },
    { tableName: "members" },
  );

  return Member;
}

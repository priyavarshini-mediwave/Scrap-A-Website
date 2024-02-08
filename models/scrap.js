const { DataTypes } = require("sequelize");

module.exports = function model(sequelize, types) {
  const Scrap = sequelize.define(
    "scrap",
    {
      scrap_id: {
        type: types.INTEGER,
        defaultValue: "",
        primarykey: true,
        unique: true,
      },
      title: {
        type: types.STRING,
        defaultValue: "",
        allowNull: false,
      },
      link: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },
      time: {
        type: types.STRING,
        defaultValue: "",
        allowNull: false,
      },
    },
    {
      tableName: "scrap",
      timestamps: false,
    }
  );

  return Scrap;
};

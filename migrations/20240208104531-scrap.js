"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("scrap", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      scrap_id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
      },
      link: {
        type: Sequelize.TEXT,
        defaultValue: "",
        allowNull: false,
      },
      time: {
        type: Sequelize.DATE,

        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("scrap");
  },
};

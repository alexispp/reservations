"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.sequelize.query(
      'ALTER TABLE "Reservations" ADD CONSTRAINT "ceremony_id_fkey" FOREIGN KEY ("CeremonyId") REFERENCES "Ceremonies" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;'
    );

     await queryInterface.addColumn(
      "Reservations", // name of Source model
      "CeremonyId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Ceremony', // name of Target model
        //   key: 'id', // key in Target model that we're referencing
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.removeColumn(
      "Reservations", // name of Source model
      "CeremonyId" // key we want to remove
    );
  },
};

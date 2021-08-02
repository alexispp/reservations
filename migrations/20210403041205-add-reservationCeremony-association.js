"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // await queryInterface.sequelize.query(
    //   'ALTER TABLE "reservations" ADD CONSTRAINT "ceremony_id_fkey" FOREIGN KEY ("ceremonyId") REFERENCES "Ceremonies" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;'
    // );

     await queryInterface.addColumn(
      "reservations", // name of Source model
      "ceremonyId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ceremonies', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    
    return await queryInterface.removeColumn(
      "reservations", 
      "ceremonyId" 
    );
  },
};

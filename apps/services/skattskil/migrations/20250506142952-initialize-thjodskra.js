'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Thjodskra 
    await queryInterface.createTable('thjodskra', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kennitala_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legal_domicile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    // Fasteignaskra 
    await queryInterface.createTable('fasteignaskra', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      property_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appraisal: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
    // Okutaekjaskra 
    await queryInterface.createTable('okutaekjaskra', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      licene_plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      purchase_year: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      purchase_price: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('thjodskra');
    await queryInterface.dropTable('fasteignaskra');
    await queryInterface.dropTable('okutaekjaskra');
  }
};

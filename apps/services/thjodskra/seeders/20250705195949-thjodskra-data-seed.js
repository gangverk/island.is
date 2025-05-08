'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Thjodskra
    await queryInterface.bulkInsert('thjodskra', [
      {
        id: uuidv4(),
        name: 'Jökull Þórðarson',
        kennitala_id: '1203894569',
        legal_domicile: 'Bláfjallagata 12',
        postal_code: '105',
        city: 'Reykjavík',
      },
      {
        id: uuidv4(),
        name: 'Íslandsbanki hf',
        kennitala_id: '4910080160',
        legal_domicile: 'Hagasmára 3',
        postal_code: '201',
        city: 'Kópavogi',
      },
    ]);

    // Seed data for Fasteignaskra
    await queryInterface.bulkInsert('fasteignaskra', [
      {
        id: uuidv4(),
        property_number: '210-9876',
        address: 'Bláfjallagata 12',
        appraisal: 52000000,
      },
    ]);

    // Seed data for Okutaekjaskra
    await queryInterface.bulkInsert('okutaekjaskra', [
      {
        id: uuidv4(),
        license_plate_number: 'KB-521',
        purchase_year: 2021,
        purchase_price: 31000000,
      },
      {
        id: uuidv4(),
        license_plate_number: 'JU-329',
        purchase_year: 2012,
        purchase_price: 4300000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded data
    await queryInterface.bulkDelete('thjodskra', null, {});
    await queryInterface.bulkDelete('fasteignaskra', null, {});
    await queryInterface.bulkDelete('okutaekjaskra', null, {});
  },
};
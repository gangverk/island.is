'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create UUIDs to use for relationships
    const taxPayerId1 = uuidv4();
    const taxPayerId2 = uuidv4();
    
    const taxReturnId1 = uuidv4();
    const taxReturnId2 = uuidv4();
    
    // Seed data for Tax Payer
    await queryInterface.bulkInsert('tax_payer', [
      {
        id: taxPayerId1,
        person_id: '1203894569', // Relates to Jökull Þórðarson in thjodskra
        phone: '5551234',
        email: 'jokull@example.is',
      },
      {
        id: taxPayerId2,
        person_id: '0102852539',
        phone: '5556789',
        email: 'anna@example.is',
      }
    ]);

    // Seed data for Tax Return
    await queryInterface.bulkInsert('tax_return', [
      {
        id: taxReturnId1,
        tax_payer_id: taxPayerId1,
        fiscal_year: 2024,
        completed: true
      },
      {
        id: taxReturnId2,
        tax_payer_id: taxPayerId2,
        fiscal_year: 2024,
        completed: false
      }
    ]);

    // Seed data for Income
    await queryInterface.bulkInsert('income', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        category: 'salary',
        description: 'Monthly salary',
        amount: 9500000, // 9,500,000 ISK
        payer: 'Island.is'
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        category: 'investment',
        description: 'Dividend income',
        amount: 1200000, // 1,200,000 ISK
        payer: 'Arion Bank'
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId2,
        category: 'salary',
        description: 'Annual salary',
        amount: 8200000, // 8,200,000 ISK
        payer: 'University of Iceland'
      }
    ]);

    // Seed data for Assets
    await queryInterface.bulkInsert('assets', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        asset_type: 'real_estate',
        asset_id: '210-9876' // Property number from fasteignaskra
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        asset_type: 'vehicle',
        asset_id: 'KB-521' // License plate from okutaekjaskra
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId2,
        asset_type: 'vehicle',
        asset_id: 'JU-329' // License plate from okutaekjaskra
      }
    ]);

    // Seed data for Liabilities
    await queryInterface.bulkInsert('liabilities', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: 'Student loan',
        interest_paid: 150000, // 150,000 ISK
        amount_remaining: 2500000 // 2,500,000 ISK
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: 'Credit card debt',
        interest_paid: 35000, // 35,000 ISK
        amount_remaining: 420000 // 420,000 ISK
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId2,
        description: 'Personal loan',
        interest_paid: 80000, // 80,000 ISK
        amount_remaining: 1200000 // 1,200,000 ISK
      }
    ]);

    // Seed data for Residential Loans
    await queryInterface.bulkInsert('residiential_loan', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        asset_id: '210-9876', // Property number
        lender_id: 'ARION',
        issue_date: '2020-06-15',
        remaining_term_years: 35,
        interest_paid_in_fiscal_year: 850000, // 850,000 ISK
        principal_paid_in_fiscal_year: 650000, // 650,000 ISK
        remaining_principal: 42500000 // 42,500,000 ISK
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId2,
        asset_id: '111-2345', // Another property
        lender_id: 'ISLANDSBANKI',
        issue_date: '2018-03-10',
        remaining_term_years: 28,
        interest_paid_in_fiscal_year: 780000, // 780,000 ISK
        principal_paid_in_fiscal_year: 720000, // 720,000 ISK
        remaining_principal: 38600000 // 38,600,000 ISK
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded data in reverse order to respect foreign key constraints
    await queryInterface.bulkDelete('residiential_loan', null, {});
    await queryInterface.bulkDelete('liabilities', null, {});
    await queryInterface.bulkDelete('assets', null, {});
    await queryInterface.bulkDelete('income', null, {});
    await queryInterface.bulkDelete('tax_return', null, {});
    await queryInterface.bulkDelete('tax_payer', null, {});
  }
};
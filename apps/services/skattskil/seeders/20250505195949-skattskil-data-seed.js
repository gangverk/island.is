'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create UUIDs to use for relationships
    const taxPayerId1 = uuidv4();
    
    const taxReturnId1 = uuidv4();
    
    // Seed data for Tax Payer
    await queryInterface.bulkInsert('tax_payer', [
      {
        id: taxPayerId1,
        person_id: '1203894569', // Relates to Jökull Þórðarson in thjodskra
        phone: '5551234',
        email: 'jokull@example.is',
      },
    ]);

    // Seed data for Tax Return
    await queryInterface.bulkInsert('tax_return', [
      {
        id: taxReturnId1,
        tax_payer_id: taxPayerId1,
        fiscal_year: 2024,
        completed: false,
      },
    ]);

    // Seed data for Income
    await queryInterface.bulkInsert('income', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        category: 'salary',
        description: 'Tekjur',
        amount: 936000000, // 9360000 ISK
        payer: 'Norðurljós Software ehf'
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        category: 'salary',
        description: 'Tekjur',
        amount: 90000000, // 900000 ISK
        payer: 'Mús & Merki ehf'
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        category: 'benefit',
        description: 'Dagpeningar',
        amount: 12000000, // 120000 ISK
        payer: 'University of Iceland'
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        category: 'grant',
        description: 'Íþróttastyrkur',
        amount: 7500000, // 75000 ISK
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
        tax_return_id: taxReturnId1,
        asset_type: 'vehicle',
        asset_id: 'JU-329' // License plate from okutaekjaskra
      }
    ]);

    // Seed data for Liabilities
    await queryInterface.bulkInsert('liabilities', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: 'Eftirstöðvar á korti númer: 4469 88XX XXXX 4567',
        interest_paid: 3920000,
        amount_remaining: 21700000
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: 'Aukalán',
        interest_paid: 8600000,
        amount_remaining: 98000000 
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: '0142-26-732645 Varðan',
        interest_paid: 1450000,
        amount_remaining: 6200000
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: 'Kílómetragjald, Skatturinn',
        interest_paid: 0,
        amount_remaining: 237000
      },
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        description: 'Þing- og sveitarsjóðsgjöld, Skatturinn',
        interest_paid: 22400,
        amount_remaining: 0
      }
    ]);

    // Seed data for Residential Loans
    await queryInterface.bulkInsert('residiential_loan', [
      {
        id: uuidv4(),
        tax_return_id: taxReturnId1,
        asset_id: '210-9876',
        loan_id: '56783900123',
        purchase_year: 2021,
        lender_id: '4910080160',
        issue_date: '2021-05-05',
        remaining_term_years: 30,
        interest_paid_in_fiscal_year: 92000000,
        principal_paid_in_fiscal_year: 136000000,
        remaining_principal: 2854000000
      },
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
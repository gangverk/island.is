'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tax Payer table
    await queryInterface.createTable('tax_payer', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      person_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });

    // Tax Return table
    await queryInterface.createTable('tax_return', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      tax_payer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tax_payer',
          key: 'id'
        },
      },
      fiscal_year: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });

    // Income table
    await queryInterface.createTable('income', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      tax_return_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tax_return',
          key: 'id'
        },
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      payer: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Assets table
    await queryInterface.createTable('assets', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      tax_return_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tax_return',
          key: 'id'
        },
      },
      asset_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      asset_id: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Liabilities table
    await queryInterface.createTable('liabilities', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      tax_return_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tax_return',
          key: 'id'
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      interest_paid: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      amount_remaining: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    });

    // Residential Loan table
    await queryInterface.createTable('residiential_loan', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      tax_return_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tax_return',
          key: 'id'
        },
      },
      asset_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lender_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      issue_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      remaining_term_years: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      interest_paid_in_fiscal_year: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      principal_paid_in_fiscal_year: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      remaining_principal: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order to respect dependencies
    await queryInterface.dropTable('residiential_loan');
    await queryInterface.dropTable('liabilities');
    await queryInterface.dropTable('assets');
    await queryInterface.dropTable('income');
    await queryInterface.dropTable('tax_return');
    await queryInterface.dropTable('tax_payer');
  }
};

import { Injectable } from '@nestjs/common'
import {
  TaxPayer,
  TaxReturn,
  TaxReturnIcelandicRealEstate,
  TaxReturnVehicle,
  TaxReturnIncome,
  TaxReturnIncomeInput,
  TaxReturnIncomeCategory,
  TaxReturnResidentialLoan,
  TaxReturnGenericLiability,
} from './model'

import { SkattskilClientService } from '@island.is/clients/skattskil'
import { uuid } from 'uuidv4'

@Injectable()
export class SkattskilService {
  constructor(private readonly skattskilClientService: SkattskilClientService) {}
  async helloWorld(): Promise<string> {
    return 'Hello world'
  }

  async getTaxPayer(id: string): Promise<TaxPayer> {
    // Implement your logic to fetch the tax payer by id
    return {
      taxPayerID: id,
      kennitala: '1234567890',
      name: 'John Doe',
      taxReturns: [],
    }
  }

  async getTaxPayerByKennitala(kennitala: string): Promise<TaxPayer> {
    const taxPayer = await this.skattskilClientService.getTaxPayerByKennitala(kennitala)
    return {
      taxPayerID: taxPayer.id,
      kennitala: taxPayer.personId,
      emailAddress: taxPayer.email,
      phoneNumber: taxPayer.phone,
      name: "Addi", // FIXME
      taxReturns: [],
    }
  }

  async getTaxReturnsByTaxPayerId(taxPayerId: string): Promise<TaxReturn[]> {
    // Implement your logic to fetch tax returns by tax payer ID
    return [
      {
        taxReturnID: uuid(),
        fiscalYear: '2025',
        income: [],
        realEstateAssets: [],
        vehicleAssets: [],
        residentialLoans: [],
        liabilities: [],
      },
      {
        taxReturnID: uuid(),
        fiscalYear: '2024',
        income: [],
        realEstateAssets: [],
        vehicleAssets: [],
        residentialLoans: [],
        liabilities: [],
      },
    ]
  }

  async getTaxReturnById(taxReturnId: string): Promise<TaxReturn> {
    const taxReturn = await this.skattskilClientService.getTaxReturnById(taxReturnId)
    // Implement your logic to fetch tax return by ID
    return {
      taxReturnID: taxReturn.id,
      fiscalYear: String(taxReturn.fiscalYear),
      income: [],
      realEstateAssets: [],
      vehicleAssets: [],
      residentialLoans: [],
      liabilities: [],
    }
  }

  async getIncome(taxReturnId: string): Promise<TaxReturnIncome[]> {
    const incomeLines = await this.skattskilClientService.getIncomeByTaxReturnId(taxReturnId)
    return incomeLines.map((income) => ({
      incomeID: income.id,
      category: ((cat: string): TaxReturnIncomeCategory => {
        switch (cat) {
          case 'salary':
            return TaxReturnIncomeCategory.SALARY
          case 'investment':
            return TaxReturnIncomeCategory.GRANT
          case 'per_diem':
            return TaxReturnIncomeCategory.PER_DIEM
          default:
            throw new Error(`Unknown income category: ${cat}`)
        }
      })(income.category),
      amount: { amount: income.amount },
      description: income.description || '',
      payer: income.payer,
    }))
  }

  async getRealEstateAssets(taxReturnId: string): Promise<TaxReturnIcelandicRealEstate[]> {
    // Implement your logic to fetch real estate assets by tax return ID
    return [
      {
        realEstateAssetID: uuid(),
        estimatedValue: { amount: 1000000 },
        address: '123 Main St',
      },
    ]
  }

  async getVehicleAssets(taxReturnId: string): Promise<TaxReturnVehicle[]> {
    // Implement your logic to fetch vehicle assets by tax return ID
    return [
      {
        vehicleAssetID: uuid(),
        purchaseAmount: { amount: 150000 },
        registrationNumber: 'ABC123',
        yearOfPurchase: '2020',
      },
    ]
  }

  async getResidentialLoans(taxReturnId: string): Promise<TaxReturnResidentialLoan[]> {
    // Implement your logic to fetch residential loans by tax return ID
    return [
      {
        residentialLoanID: uuid(),
        amountPaidInFiscalYear: { amount: 300000 },
        yearOfPurchase: '2018',
        address: '456 Elm St',
        dateOfIssuance: '2018-03-01',
        interestPaidInFiscalYear: { amount: 1500 },
        lenderKennitala: "0987654321",
        lenderName: "Lender A",
        loanNumber: "45678123",
        remainingTermYears: "15",
      },
    ]
  }

  async getLiabilities(taxReturnId: string): Promise<TaxReturnGenericLiability[]> {
    // Implement your logic to fetch liabilities by tax return ID
    return [
      {
        liabilityID: uuid(),
        amountRemaining: { amount: 50000 },
        interestPaid: { amount: 2000 },
        description: 'Credit Card Debt',
      },
    ]
  }

  async addTaxReturnIncome(taxReturnId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    // Implement your logic to add taxable income
    return {
      ...input,
      amount: input.amount,
      incomeID: uuid(),
    }
  }

  async updateTaxReturnIncome(incomeId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    // Implement your logic to update taxable income
    return {
      ...input,
      amount: input.amount,
      incomeID: incomeId,
    }
  }

  async deleteTaxReturnIncome(incomeId: string): Promise<boolean> {
    // Implement your logic to delete taxable income
    return true
  }
}

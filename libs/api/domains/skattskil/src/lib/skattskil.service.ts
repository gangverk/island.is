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
    return await this.skattskilClientService.getTaxPayerByKennitala(kennitala).then((taxPayer) => {
      return {
        taxPayerID: taxPayer.id,
        kennitala: taxPayer.personId,
        emailAddress: taxPayer.emailAddress,
        phoneNumber: taxPayer.phoneNumber,
        name: taxPayer.name,
        taxReturns: [],
      }
    })
  }

  async getTaxReturnsByTaxPayerId(taxPayerId: string): Promise<TaxReturn[]> {
    return await this.skattskilClientService.getTaxReturnsByTaxPayerId(taxPayerId).then((taxReturns) => {
      return taxReturns.map((taxReturn) => ({
        taxReturnID: taxReturn.id,
        fiscalYear: String(taxReturn.fiscalYear),
        income: [],
        realEstateAssets: [],
        vehicleAssets: [],
        residentialLoans: [],
        liabilities: [],
      }))
    })
  }

  async getTaxReturnById(taxReturnId: string): Promise<TaxReturn> {
    return await this.skattskilClientService.getTaxReturnById(taxReturnId).then((taxReturn) => {
      return {
        taxReturnID: taxReturn.id,
        fiscalYear: String(taxReturn.fiscalYear),
        income: [],
        realEstateAssets: [],
        vehicleAssets: [],
        residentialLoans: [],
        liabilities: [],
      }
    })
  }

  async getIncome(taxReturnId: string): Promise<TaxReturnIncome[]> {
    return await this.skattskilClientService.getIncomeByTaxReturnId(taxReturnId).then((incomeLines) => {
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
    })
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

  async addTaxReturnSalaryIncome(taxReturnId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    const income = await this.skattskilClientService.addTaxReturnSalaryIncome(taxReturnId, input.description, input.amount.amount, input.payer)
    return {
      incomeID: income.id,
      category: TaxReturnIncomeCategory.SALARY,
      description: income.description || '',
      amount: { amount: income.amount },
      payer: income.payer,
    }
  }

  async addTaxReturnGrantIncome(taxReturnId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    const income = await this.skattskilClientService.addTaxReturnGrantIncome(taxReturnId, input.description, input.amount.amount, input.payer)
    return {
      incomeID: income.id,
      category: TaxReturnIncomeCategory.GRANT,
      description: income.description || '',
      amount: { amount: income.amount },
      payer: income.payer,
    }
  }

  async addTaxReturnPerDiemIncome(taxReturnId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    const income = await this.skattskilClientService.addTaxReturnPerDiemIncome(taxReturnId, input.description, input.amount.amount, input.payer)
    return {
      incomeID: income.id,
      category: TaxReturnIncomeCategory.PER_DIEM,
      description: income.description || '',
      amount: { amount: income.amount },
      payer: income.payer,
    }
  }

  async updateTaxReturnIncome(incomeId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    switch (input.category) {
      case TaxReturnIncomeCategory.SALARY:
        return await this.skattskilClientService.updateTaxReturnSalaryIncome(incomeId, input.description, input.amount.amount, input.payer).then((income) => ({
          incomeID: income.id,
          category: TaxReturnIncomeCategory.SALARY,
          description: income.description || '',
          amount: { amount: income.amount },
          payer: income.payer,
        }))
      case TaxReturnIncomeCategory.GRANT:
        return await this.skattskilClientService.updateTaxReturnGrantIncome(incomeId, input.description, input.amount.amount, input.payer).then((income) => ({
          incomeID: income.id,
          category: TaxReturnIncomeCategory.GRANT,
          description: income.description || '',
          amount: { amount: income.amount },
          payer: income.payer,
        }))
      case TaxReturnIncomeCategory.PER_DIEM:
        return await this.skattskilClientService.updateTaxReturnPerDiemIncome(incomeId, input.description, input.amount.amount, input.payer).then((income) => ({
          incomeID: income.id,
          category: TaxReturnIncomeCategory.PER_DIEM,
          description: income.description || '',
          amount: { amount: income.amount },
          payer: income.payer,
        }))
      default:
        throw new Error('Invalid income category')
    }
  }

  async deleteTaxReturnIncome(incomeId: string): Promise<boolean> {
    // Implement your logic to delete taxable income
    return true
  }
}

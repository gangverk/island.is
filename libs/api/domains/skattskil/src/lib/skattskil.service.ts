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
  MutationSuccess,
} from './model'

import { SkattskilClientService } from '@island.is/clients/skattskil'

@Injectable()
export class SkattskilService {
  constructor(private readonly skattskilClientService: SkattskilClientService) {}

  async getTaxPayer(id: string): Promise<TaxPayer> {
    return await this.skattskilClientService.getTaxPayerById(id).then((taxPayer) => {
      return {
        taxPayerID: taxPayer.id,
        name: taxPayer.name,
        kennitala: taxPayer.personId,
        address: taxPayer.address,
        emailAddress: taxPayer.emailAddress,
        phoneNumber: taxPayer.phoneNumber,
        bankAccountNumber: taxPayer.bankAccountNumber,
        taxReturns: [],
      }
    })
  }

  async getTaxPayerByKennitala(kennitala: string): Promise<TaxPayer> {
    return await this.skattskilClientService.getTaxPayerByKennitala(kennitala).then((taxPayer) => {
      return {
        taxPayerID: taxPayer.id,
        name: taxPayer.name,
        kennitala: taxPayer.personId,
        address: taxPayer.address,
        emailAddress: taxPayer.emailAddress,
        phoneNumber: taxPayer.phoneNumber,
        bankAccountNumber: taxPayer.bankAccountNumber,
        taxReturns: [],
      }
    })
  }

  async updateTaxPayer(id: string, phoneNumber: string, emailAddress: string, bankAccountNumber: string): Promise<TaxPayer> {
    const taxPayer = await this.skattskilClientService.updateTaxPayer(id, phoneNumber, emailAddress, bankAccountNumber).then((taxPayer) => {
      return {
        taxPayerID: taxPayer.id,
        name: taxPayer.name,
        kennitala: taxPayer.personId,
        address: taxPayer.address,
        emailAddress: taxPayer.emailAddress,
        phoneNumber: taxPayer.phoneNumber,
        bankAccountNumber: taxPayer.bankAccountNumber,
        taxReturns: [],
      }
    })
    return taxPayer
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
            case 'grant':
              return TaxReturnIncomeCategory.GRANT
            case 'benefit':
              return TaxReturnIncomeCategory.BENEFIT
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
    return await this.skattskilClientService.getRealEstateAssetsByTaxReturnId(taxReturnId).then((realEstateAssets) => {
      return realEstateAssets.map((realEstateAsset) => ({
        realEstateAssetID: realEstateAsset.realEstateAssetId,
        estimatedValue: { amount: realEstateAsset.estimatedValue },
        address: realEstateAsset.address,
      }))
    })
  }

  async getVehicleAssets(taxReturnId: string): Promise<TaxReturnVehicle[]> {
    return await this.skattskilClientService.getVehicleAssetsByTaxReturnId(taxReturnId).then((vehicleAssets) => {
      return vehicleAssets.map((vehicleAsset) => ({
        vehicleAssetID: vehicleAsset.vehicleAssetId,
        purchaseAmount: { amount: vehicleAsset.purchaseAmount },
        registrationNumber: vehicleAsset.registrationNumber,
        yearOfPurchase: vehicleAsset.yearOfPurchase,
      }))
    })
  }

  async getResidentialLoans(taxReturnId: string): Promise<TaxReturnResidentialLoan[]> {
    return await this.skattskilClientService.getResidentialLoansByTaxReturnId(taxReturnId).then((residentialLoans) => {
      return residentialLoans.map((residentialLoan) => ({
        residentialLoanID: residentialLoan.id,
        amountPaidInFiscalYear: { amount: residentialLoan.totalAmountPaidInFiscalYear },
        yearOfPurchase: residentialLoan.purchaseYear,
        address: residentialLoan.address,
        dateOfIssuance: residentialLoan.issueDate.toISOString().slice(0,10),
        interestPaidInFiscalYear: { amount: residentialLoan.interestPaidInFiscalYear },
        lenderKennitala: residentialLoan.lenderId,
        lenderName: residentialLoan.lenderName,
          loanNumber: residentialLoan.loanId,
        remainingTermYears: residentialLoan.remainingTermYears,
      }))
    })
  }

  async getLiabilities(taxReturnId: string): Promise<TaxReturnGenericLiability[]> {
    return await this.skattskilClientService.getLiabilitiesByTaxReturnId(taxReturnId).then((liabilities) => {
      return liabilities.map((liability) => ({
        liabilityID: liability.id,
        amountRemaining: { amount: liability.amountRemaining },
        interestPaid: { amount: liability.interestPaid || 0 },
        description: liability.description || '',
      }))
    })
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

  async addTaxReturnBenefitIncome(taxReturnId: string, input: TaxReturnIncomeInput): Promise<TaxReturnIncome> {
    const income = await this.skattskilClientService.addTaxReturnPerDiemIncome(taxReturnId, input.description, input.amount.amount, input.payer)
    return {
      incomeID: income.id,
      category: TaxReturnIncomeCategory.BENEFIT,
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
      case TaxReturnIncomeCategory.BENEFIT:
        return await this.skattskilClientService.updateTaxReturnBenefitIncome(incomeId, input.description, input.amount.amount, input.payer).then((income) => ({
          incomeID: income.id,
          category: TaxReturnIncomeCategory.BENEFIT,
          description: income.description || '',
          amount: { amount: income.amount },
          payer: income.payer,
        }))
      default:
        throw new Error('Invalid income category')
    }
  }

  async deleteTaxReturnIncome(incomeId: string): Promise<MutationSuccess> {
    return await this.skattskilClientService.deleteTaxReturnIncome(incomeId).then((_) => {
      return {
        success: true,
      }
    })
  }
}

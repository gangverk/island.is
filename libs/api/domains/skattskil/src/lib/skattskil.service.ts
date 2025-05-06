import { Injectable } from '@nestjs/common'
import { TaxPayer, TaxReturn, Money, TaxReturnIcelandicRealEstate, TaxReturnVehicle, TaxReturnIncome, TaxReturnIncomeCategory, TaxReturnResidentialLoan, TaxReturnGenericLiability } from './model'
import { uuid } from 'uuidv4'

@Injectable()
export class SkattskilService {
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
    // Implement your logic to fetch the tax payer by kennitala
    return {
      taxPayerID: uuid(),
      kennitala: kennitala,
      name: 'John Doe',
      taxReturns: [],
    }
  }

  async getTaxReturnsByTaxPayerId(taxPayerId: string): Promise<TaxReturn[]> {
    // Implement your logic to fetch tax returns by tax payer ID
    return [
      {
        taxReturnID: uuid(),
        fiscalYear: '2023',
        income: [],
        realEstateAssets: [],
        vehicleAssets: [],
        residentialLoans: [],
        liabilities: [],
      },
    ]
  }

  async getIncome(taxReturnId: string): Promise<TaxReturnIncome[]> {
    // Implement your logic to fetch income by tax return ID
    return [
      {
        taxReturnIncomeID: uuid(),
        category: TaxReturnIncomeCategory.SALARY,
        amount: { amount: '600000' },
        description: 'Laun',
        payer: 'Company A',
      },
    ]
  }

  async getRealEstateAssets(taxReturnId: string): Promise<TaxReturnIcelandicRealEstate[]> {
    // Implement your logic to fetch real estate assets by tax return ID
    return [
      {
        realEstateAssetID: uuid(),
        estimatedValue: { amount: "1000000" },
        address: '123 Main St',
      },
    ]
  }

  async getVehicleAssets(taxReturnId: string): Promise<TaxReturnVehicle[]> {
    // Implement your logic to fetch vehicle assets by tax return ID
    return [
      {
        vehicleAssetID: uuid(),
        purchaseAmount: { amount: '150000' },
        registrationNumber: 'ABC123',
        yearOfPurchase: '2020',
      },
    ]
  }

  async getResidentialLoans(taxReturnId: string): Promise<TaxReturnResidentialLoan[]> {
    // Implement your logic to fetch residential loans by tax return ID
    return [
      {
        taxReturnResidentialLoanID: uuid(),
        amountPaidInFiscalYear: { amount: '300000' },
        yearOfPurchase: '2018',
        address: '456 Elm St',
        dateOfIssuance: '2018-03-01',
        interestPaidInFiscalYear: { amount: '1500' },
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
        taxReturnLiabilityID: uuid(),
        amountRemaining: { amount: '50000' },
        interestPaid: { amount: '2000' },
        description: 'Credit Card Debt',
      },
    ]
  }
}

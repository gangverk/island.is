import { Inject } from '@nestjs/common'
import {
  SkattskilApi,
} from '../../gen/fetch/apis'
import { SkattskilClientConfig } from './SkattskilClientConfig'
import { ConfigType } from '@nestjs/config'

export class SkattskilClientService {
  constructor(
    @Inject(SkattskilClientConfig.KEY)
    private readonly config: ConfigType<typeof SkattskilClientConfig>,
    private skattskilApi: SkattskilApi,
  ) {}

  getTaxPayerById(id: string) {
    return this.skattskilApi.skattskilControllerGetTaxPayerById({
      id,
    })
  }

  getTaxPayerByKennitala(kennitala: string) {
    return this.skattskilApi.skattskilControllerGetTaxPayerByKennitala({
      kennitala,
    })
  }

  updateTaxPayer(id: string, phoneNumber: string, emailAddress: string, bankAccountNumber: string) {
    return this.skattskilApi.skattskilControllerUpdateTaxPayer({
      id,
      taxPayerInputDTO: {
        phoneNumber,
        emailAddress,
        bankAccountNumber,
      },
    })
  }

  getTaxReturnById(id: string) {
    return this.skattskilApi.skattskilControllerGetTaxReturnById({
      id,
    })
  }

  getTaxReturnsByTaxPayerId(taxPayerId: string) {
    return this.skattskilApi.skattskilControllerGetTaxReturnsByTaxPayerId({
      taxPayerId,
    })
  }

  getIncomeByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetIncomeByTaxReturnId({
      taxReturnId,
    })
  }

  addTaxReturnSalaryIncome(taxReturnId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerCreateSalaryIncome({
      taxReturnId,
      incomeInputDTO: {
        description: description,
        amount: amount,
        payer: payer,
      },
    })
  }

  addTaxReturnGrantIncome(taxReturnId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerCreateGrantIncome({
      taxReturnId,
      incomeInputDTO: {
        description: description,
        amount: amount,
        payer: payer,
      },
    })
  }

  addTaxReturnPerDiemIncome(taxReturnId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerCreateBenefitIncome({
      taxReturnId,
      incomeInputDTO: {
        description: description,
        amount: amount,
        payer: payer,
      },
    })
  }

  updateTaxReturnSalaryIncome(incomeId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerUpdateSalaryIncome({
      id: incomeId,
      incomeInputDTO: {
        description: description,
        amount: amount,
        payer: payer,
      },
    })
  }

  updateTaxReturnBenefitIncome(incomeId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerUpdateBenefitIncome({
      id: incomeId,
      incomeInputDTO: {
        description: description,
        amount: amount,
        payer: payer,
      },
    })
  }

  updateTaxReturnGrantIncome(incomeId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerUpdateGrantIncome({
      id: incomeId,
      incomeInputDTO: {
        description: description,
        amount: amount,
        payer: payer,
      },
    })
  }

  deleteTaxReturnIncome(incomeId: string) {
    return this.skattskilApi.skattskilControllerDeleteIncome({
      id: incomeId,
    })
  }

  getRealEstateAssetsByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetRealEstateAssetsByTaxReturnId({
      taxReturnId,
    })
  }

  getVehicleAssetsByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetVehicleAssetsByTaxReturnId({
      taxReturnId,
    })
  }

  getResidentialLoansByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetResidentialLoansByTaxReturnId({
      taxReturnId,
    })
  }

  getLiabilitiesByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetLiabilitiesByTaxReturnId({
      taxReturnId,
    })
  }
}

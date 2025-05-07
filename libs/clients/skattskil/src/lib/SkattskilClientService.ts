import { Inject } from '@nestjs/common'
import {
  ThjodskraApi,
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

  getIncomeByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetIncomeByTaxReturnId({
      taxReturnId,
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
    return this.skattskilApi.skattskilControllerCreatePerDiemIncome({
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

  updateTaxReturnPerDiemIncome(incomeId: string, description: string, amount: number, payer: string) {
    return this.skattskilApi.skattskilControllerUpdatePerDiemIncome({
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
}

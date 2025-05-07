import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { SkattskilService } from './skattskil.service'
import {
  TaxPayer, TaxReturn, TaxReturnGenericLiability,
  TaxReturnResidentialLoan, TaxReturnIcelandicRealEstate, TaxReturnIncome, TaxReturnVehicle,
  TaxReturnIncomeInput,
} from './model'

@Resolver()
export class SkattskilResolver {
  constructor(private skattskilService: SkattskilService) {}

  @Query(() => String)
  async helloWorld(
  ): Promise<string> {
    return this.skattskilService.helloWorld()
  }
}

@Resolver(() => TaxPayer)
export class TaxPayerResolver {
  constructor(private skattskilService: SkattskilService) {}

  @Query(() => TaxPayer, { name: 'taxPayerByKennitala' })
  async getTaxPayerByKennitala(
    @Args('kennitala') kennitala: string,
  ): Promise<TaxPayer> {
    return this.skattskilService.getTaxPayerByKennitala(kennitala)
  }

  @ResolveField('taxReturns', () => [TaxReturn])
  async getTaxReturns(@Parent() taxPayer: TaxPayer): Promise<TaxReturn[]> {
    return this.skattskilService.getTaxReturnsByTaxPayerId(taxPayer.taxPayerID)
  }
}

@Resolver(() => TaxReturn)
export class TaxReturnResolver {
  constructor(private skattskilService: SkattskilService) {}

  @Query(() => TaxReturn, { name: 'taxReturnById' })
  async getTaxReturnById(
    @Args('taxReturnId') taxReturnId: string,
  ): Promise<TaxReturn> {
    return this.skattskilService.getTaxReturnById(taxReturnId)
  }

  @ResolveField('income', () => [TaxReturnIncome])
  async getIncome(@Parent() taxReturn: TaxReturn): Promise<TaxReturnIncome[]> {
    return this.skattskilService.getIncome(taxReturn.taxReturnID)
  }

  @ResolveField('realEstateAssets', () => [TaxReturnIcelandicRealEstate])
  async getRealEstateAssets(@Parent() taxReturn: TaxReturn): Promise<TaxReturnIcelandicRealEstate[]> {
    return this.skattskilService.getRealEstateAssets(taxReturn.taxReturnID)
  }

  @ResolveField('vehicleAssets', () => [TaxReturnVehicle])
  async getVehicleAssets(@Parent() taxReturn: TaxReturn): Promise<TaxReturnVehicle[]> {
    return this.skattskilService.getVehicleAssets(taxReturn.taxReturnID)
  }

  @ResolveField('residentialLoans', () => [TaxReturnResidentialLoan])
  async getResidentialLoans(@Parent() taxReturn: TaxReturn): Promise<TaxReturnResidentialLoan[]> {
    return this.skattskilService.getResidentialLoans(taxReturn.taxReturnID)
  }

  @ResolveField('liabilities', () => [TaxReturnGenericLiability])
  async getLiabilities(@Parent() taxReturn: TaxReturn): Promise<TaxReturnGenericLiability[]> {
    return this.skattskilService.getLiabilities(taxReturn.taxReturnID)
  }
}

@Resolver(() => TaxReturnIncome)
export class TaxReturnIncomeResolver {
  constructor(private skattskilService: SkattskilService) {}

  @Mutation(() => TaxReturnIncome)
  async addTaxReturnIncome(
    @Args('taxReturnId') taxReturnId: string,
    @Args('input') input: TaxReturnIncomeInput,
  ): Promise<TaxReturnIncome> {
    return this.skattskilService.addTaxReturnIncome(taxReturnId, input)
  }

  @Mutation(() => TaxReturnIncome)
  async updateTaxReturnIncome(
    @Args('incomeId') incomeId: string,
    @Args('input') input: TaxReturnIncomeInput,
  ): Promise<TaxReturnIncome> {
    return this.skattskilService.updateTaxReturnIncome(incomeId, input)
  }

  @Mutation(() => Boolean)
  async deleteTaxReturnIncome(
    @Args('incomeId') incomeId: string,
  ): Promise<boolean> {
    return this.skattskilService.deleteTaxReturnIncome(incomeId)
  }
}

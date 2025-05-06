import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { SkattskilService } from './skattskil.service'
import {
  TaxPayer, TaxReturn, TaxReturnGenericLiability,
  TaxReturnResidentialLoan, TaxReturnIcelandicRealEstate, TaxReturnIncome, TaxReturnVehicle
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

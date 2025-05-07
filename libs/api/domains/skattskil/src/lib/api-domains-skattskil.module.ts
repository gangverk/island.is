import { Module } from '@nestjs/common'
import { SkattskilService } from './skattskil.service';
import { SkattskilResolver, TaxPayerResolver, TaxReturnResolver, TaxReturnIncomeResolver } from './skattskil.resolver';


@Module({
  imports: [],
  providers: [SkattskilResolver, TaxPayerResolver, TaxReturnResolver, TaxReturnIncomeResolver, SkattskilService],
  exports: [],
})
export class ApiDomainsSkattskilModule {}

import { Module } from '@nestjs/common'
import { SkattskilService } from './skattskil.service';
import { SkattskilResolver, TaxPayerResolver, TaxReturnResolver, TaxReturnIncomeResolver } from './skattskil.resolver';
import { SkattskilClientModule } from '@island.is/clients/skattskil';


@Module({
  imports: [SkattskilClientModule],
  providers: [SkattskilResolver, TaxPayerResolver, TaxReturnResolver, TaxReturnIncomeResolver, SkattskilService],
  exports: [],
})
export class ApiDomainsSkattskilModule {}

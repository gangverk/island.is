import { Module } from '@nestjs/common'
import { SkattskilService } from './skattskil.service';
import { SkattskilResolver, TaxPayerResolver, TaxReturnResolver } from './skattskil.resolver';


@Module({
  imports: [],
  providers: [SkattskilResolver, TaxPayerResolver, TaxReturnResolver, SkattskilService],
  exports: [],
})
export class ApiDomainsSkattskilModule {}

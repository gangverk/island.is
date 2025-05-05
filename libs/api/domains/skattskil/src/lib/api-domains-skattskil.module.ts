import { Module } from '@nestjs/common'
import { SkattskilService } from './skattskil.service';
import { SkattskilResolver } from './skattskil.resolver';


@Module({
  imports: [],
  providers: [SkattskilResolver, SkattskilService],
  exports: [],
})
export class ApiDomainsSkattskilModule {}

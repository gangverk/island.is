import { Module } from '@nestjs/common'
import { SkattskilService } from './skattskil.service';
import { SkattskilResolver } from './skattskil.resolver';
import { ElasticModule } from '@island.is/api-catalogue/elastic'
import { ApiCatalogueServicesModule } from '@island.is/api-catalogue/services'


@Module({
  imports: [ElasticModule, ApiCatalogueServicesModule],
  providers: [SkattskilResolver, SkattskilService],
  exports: [],
})
export class ApiDomainsSkattskilModule {}

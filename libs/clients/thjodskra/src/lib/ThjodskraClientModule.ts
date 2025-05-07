import { Module } from '@nestjs/common'
import { ApiConfiguration } from './apiConfiguration'
import { exportedApis } from './apis'
import { ThjodskraClientService } from './ThjodskraClientService'

@Module({
  providers: [ThjodskraClientService, ApiConfiguration, ...exportedApis],
  exports: [ThjodskraClientService, ...exportedApis],
})
export class ThjodskraClientModule {}

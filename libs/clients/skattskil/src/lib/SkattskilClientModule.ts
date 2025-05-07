import { Module } from '@nestjs/common'
import { ApiConfiguration } from './apiConfiguration'
import { exportedApis } from './apis'
import { SkattskilClientService } from './SkattskilClientService'

@Module({
  providers: [SkattskilClientService, ApiConfiguration, ...exportedApis],
  exports: [SkattskilClientService, ...exportedApis],
})
export class SkattskilClientModule {}

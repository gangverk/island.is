import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { LoggingModule } from '@island.is/logging'
import { SkattskilModule } from './skattskil/skattskil.module'
import { ThjodskraClientConfig } from '@island.is/clients/thjodskra'
import { SequelizeConfigService } from '../sequelizeConfig.service'


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    LoggingModule,
    SkattskilModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        ThjodskraClientConfig,
      ],
    }),
  ],
})
export class AppModule {}

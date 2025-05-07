import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggingModule } from '@island.is/logging'
import { ThjodskraModule } from './thjodskra/thjodskra.module'
import { SequelizeConfigService } from '../sequelizeConfig.service'


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    LoggingModule,
    ThjodskraModule
  ],
})
export class AppModule {}

import { logger, LOGGER_PROVIDER } from '@island.is/logging'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import {
  ThjodskraController
} from './thjodskra.controller'
import { ThjodskraService } from './thjodskra.service'
import { Thjodskra } from './models/thjodskra.model';
import { Okutaekjaskra } from './models/okutaekjaskra.model'
import { Fasteignaskra } from './models/fasteignaskra.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Fasteignaskra,
      Thjodskra,
      Okutaekjaskra,
    ]),
  ],
  controllers: [
    ThjodskraController,
  ],
  providers: [
    {
      provide: LOGGER_PROVIDER,
      useValue: logger,
    },
    ThjodskraService,
  ],
})
export class ThjodskraModule {}

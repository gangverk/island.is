import { logger, LOGGER_PROVIDER } from '@island.is/logging'
import { Module } from '@nestjs/common'
import {
  SkattskilController
} from './skattskil.controller'
import { SkattskilService } from './skattskil.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Assets } from './models/assets.model'
import { Income } from './models/income.model'
import { Liabilities } from './models/liabilities.model'
import { ResidentialLoan } from './models/residentialLoan.model'
import { TaxPayer } from './models/taxPayer.model'
import { TaxReturn } from './models/taxReturn.model'
import { ThjodskraService } from '../thjodskra/thjodskra.service'
import { Fasteignaskra } from '../thjodskra/models/fasteignaskra.model'
import { Thjodskra } from '../thjodskra/models/thjodskra.model'
import { Okutaekjaskra } from '../thjodskra/models/okutaekjaskra.model'
import { ThjodskraClientModule } from '@island.is/clients/thjodskra'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Assets,
      Income,
      Liabilities,
      ResidentialLoan,
      TaxPayer,
      TaxReturn,
      Fasteignaskra,
      Thjodskra,
      Okutaekjaskra,
    ]),
    ThjodskraClientModule,
  ],
  controllers: [
    SkattskilController,
  ],
  providers: [
    {
      provide: LOGGER_PROVIDER,
      useValue: logger,
    },
    SkattskilService,
    ThjodskraService
  ],
})
export class SkattskilModule {}

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
  ],
})
export class SkattskilModule {}

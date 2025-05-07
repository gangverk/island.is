import { bootstrap } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,
  name: 'thjodskra',
  openApi,
  port: 3002,
  swaggerPath: '/swagger',
  enableVersioning: true,
})

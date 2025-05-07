import { bootstrap } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

bootstrap({
  appModule: AppModule,
  name: 'skattskil',
  openApi,
  port: 3000,
  swaggerPath: '/swagger',
  enableVersioning: true,
})

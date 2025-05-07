import { Configuration } from '../../gen/fetch'

import { ThjodskraClientConfig } from './ThjodskraClientConfig'
import { ConfigType } from '@nestjs/config'
import { createEnhancedFetch } from '@island.is/clients/middlewares'

export const ApiConfiguration = {
  provide: 'ThjodskraClientConfiguration',
  useFactory: (config: ConfigType<typeof ThjodskraClientConfig>) => {
    return new Configuration({
      fetchApi: createEnhancedFetch({
        name: 'ThjodskraClientService',
        organizationSlug: 'thjodskra',
        logErrorResponseBody: true,
      }),
      basePath: config.thjodskraApiUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  },
  inject: [ThjodskraClientConfig.KEY],
}

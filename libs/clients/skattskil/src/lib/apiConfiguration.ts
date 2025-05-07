import { Configuration } from '../../gen/fetch'

import { SkattskilClientConfig } from './SkattskilClientConfig'
import { ConfigType } from '@nestjs/config'
import { createEnhancedFetch } from '@island.is/clients/middlewares'

export const ApiConfiguration = {
  provide: 'SkattskilClientConfiguration',
  useFactory: (config: ConfigType<typeof SkattskilClientConfig>) => {
    return new Configuration({
      fetchApi: createEnhancedFetch({
        name: 'SkattskilClientService',
        organizationSlug: 'skatturinn',
        logErrorResponseBody: true,
      }),
      basePath: config.skattskilApiUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  },
  inject: [SkattskilClientConfig.KEY],
}

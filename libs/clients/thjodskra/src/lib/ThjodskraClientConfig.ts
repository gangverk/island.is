import * as z from 'zod'
import { defineConfig } from '@island.is/nest/config'

const schema = z.object({
  thjodskraApiUrl: z.string(),
})

export const ThjodskraClientConfig = defineConfig({
  name: 'ThjodskraClientConfig',
  schema,
  load: (env) => ({
    thjodskraApiUrl: env.required(
      'THJODSKRA_API_URL',
      'http://localhost:3002',
    ),
  }),
})

import * as z from 'zod'
import { defineConfig } from '@island.is/nest/config'

const schema = z.object({
  skattskilApiUrl: z.string(),
})

export const SkattskilClientConfig = defineConfig({
  name: 'SkattskilClientConfig',
  schema,
  load: (env) => ({
    skattskilApiUrl: env.required(
      'SKATTSKIL_API_URL',
      'http://localhost:3000',
    ),
  }),
})

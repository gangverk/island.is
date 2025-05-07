import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('Skattskil API')
  .setDescription(`Protected API to manage tax returns`)
  .setVersion('1.0')
  .addTag('skattskil-api')
  .build()

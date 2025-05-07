import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('Thjodskra API')
  .setDescription(`Protected API to manage thjodskra`)
  .setVersion('1.0')
  .addTag('thjodskra-api')
  .build()

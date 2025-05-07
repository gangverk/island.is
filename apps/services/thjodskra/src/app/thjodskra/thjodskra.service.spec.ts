import { Test } from '@nestjs/testing'

import { ThjodskraService } from './thjodskra.service'

describe('AppService', () => {
  let service: ThjodskraService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ThjodskraService],
    }).compile()

    service = app.get<ThjodskraService>(ThjodskraService)
  })
})

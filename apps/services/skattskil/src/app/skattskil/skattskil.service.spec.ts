import { Test } from '@nestjs/testing'

import { SkattskilService } from './skattskil.service'

describe('SkattskilService', () => {
  let service: SkattskilService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [SkattskilService],
    }).compile()

    service = app.get<SkattskilService>(SkattskilService)
  })
})

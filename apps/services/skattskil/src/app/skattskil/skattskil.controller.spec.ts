import { Test, TestingModule } from '@nestjs/testing'

import { SkattskilController } from './skattskil.controller'
import { SkattskilService } from './skattskil.service'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SkattskilController],
      providers: [SkattskilService],
    }).compile()
  })
})

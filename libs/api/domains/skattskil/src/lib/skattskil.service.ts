import { Injectable } from '@nestjs/common'

@Injectable()
export class SkattskilService {
  async helloWorld(): Promise<string> {
    return 'Hello world'
  }
}

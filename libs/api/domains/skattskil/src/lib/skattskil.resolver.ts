import { Resolver, Query } from '@nestjs/graphql'
import { SkattskilService } from './skattskil.service'

@Resolver()
export class SkattskilResolver {
  constructor(private skattskilService: SkattskilService) {}

  @Query(() => String)
  async helloWorld(
  ): Promise<string> {
    return this.skattskilService.helloWorld()
  }
}

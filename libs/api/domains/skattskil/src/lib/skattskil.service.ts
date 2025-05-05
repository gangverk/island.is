import { Injectable } from '@nestjs/common'
import { ElasticService } from '@island.is/api-catalogue/elastic'
import { RestMetadataService } from '@island.is/api-catalogue/services'

@Injectable()
export class SkattskilService {
  constructor(
    private readonly elastic: ElasticService,
    private readonly restMetadataService: RestMetadataService,
  ) {}

  async helloWorld(): Promise<string> {
    return 'Hello world'
  }
}

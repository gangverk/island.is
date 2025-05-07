import { Inject } from '@nestjs/common'
import {
  ThjodskraApi,
} from '../../gen/fetch/apis'
import { ThjodskraClientConfig } from './ThjodskraClientConfig'
import { ConfigType } from '@nestjs/config'

export class ThjodskraClientService {
  constructor(
    @Inject(ThjodskraClientConfig.KEY)
    private readonly config: ConfigType<typeof ThjodskraClientConfig>,
    private thjodskraApi: ThjodskraApi,
  ) {}

  getPersonById(id: string) {
    return this.thjodskraApi.thjodskraControllerGetPerson({
      id,
    })
  }
}

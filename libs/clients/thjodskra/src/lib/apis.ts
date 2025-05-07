import {
  Configuration,
  ThjodskraApi,
} from '../../gen/fetch'
import { ApiConfiguration } from './apiConfiguration'

export const exportedApis = [
  ThjodskraApi,
].map((Api) => ({
  provide: Api,
  useFactory: (configuration: Configuration) => new Api(configuration),
  inject: [ApiConfiguration.provide],
}))

import { Inject } from '@nestjs/common'
import {
  ThjodskraApi,
  SkattskilApi,
} from '../../gen/fetch/apis'
import { SkattskilClientConfig } from './SkattskilClientConfig'
import { ConfigType } from '@nestjs/config'
//import {
//  CreateDraftRegulationCancelDto,
//  CreateDraftRegulationChangeDto,
//  CreateDraftRegulationDto,
//  UpdateDraftRegulationCancelDto,
//  UpdateDraftRegulationChangeDto,
//  UpdateDraftRegulationDto,
//} from '../../gen/fetch/models'

export class SkattskilClientService {
  constructor(
    @Inject(SkattskilClientConfig.KEY)
    private readonly config: ConfigType<typeof SkattskilClientConfig>,
    private thjodskraApi: ThjodskraApi,
    private skattskilApi: SkattskilApi,
  ) {}

  getTaxPayerById(id: string) {
    return this.skattskilApi.skattskilControllerGetTaxPayerById({
      id,
    })
  }

  getTaxPayerByKennitala(kennitala: string) {
    return this.skattskilApi.skattskilControllerGetTaxPayerByKennitala({
      kennitala,
    })
  }

  getIncomeByTaxReturnId(taxReturnId: string) {
    return this.skattskilApi.skattskilControllerGetIncomeByTaxReturnId({
      taxReturnId,
    })
  }

  getTaxReturnById(id: string) {
    return this.skattskilApi.skattskilControllerGetTaxReturnById({
      id,
    })
  }

  //getShippedRegulations(auth: Auth) {
  //  return this.draftRegulationsApiWithAuth(
  //    auth,
  //  ).draftRegulationControllerGetAllShipped()
  //}

  //getDraftRegulation(draftId: string, auth: Auth) {
  //  return this.draftRegulationsApiWithAuth(
  //    auth,
  //  ).draftRegulationControllerGetById({
  //    id: draftId,
  //  }) as unknown as RegulationDraft | null
  //}

  //getImpactsByName(name: string, auth: Auth) {
  //  return this.draftRegulationsApiWithAuth(
  //    auth,
  //  ).draftRegulationControllerGetImpactsByName({
  //    name,
  //  }) as unknown as DraftImpact[] | null
  //}

  //create(auth: Auth, input: CreateDraftRegulationDto) {
  //  return this.draftRegulationsApiWithAuth(
  //    auth,
  //  ).draftRegulationControllerCreate({
  //    createDraftRegulationDto: {
  //      type: input.type || 'base',
  //    },
  //  })
  //}

  //updateById(draftId: string, body: UpdateDraftRegulationDto, auth: Auth) {
  //  return this.draftRegulationsApiWithAuth(
  //    auth,
  //  ).draftRegulationControllerUpdate({
  //    updateDraftRegulationDto: body,
  //    id: draftId,
  //  })
  //}

  //deleteById(draftId: string, auth: Auth) {
  //  return this.draftRegulationsApiWithAuth(
  //    auth,
  //  ).draftRegulationControllerDelete({
  //    id: draftId,
  //  })
  //}

  //createDraftRegulationCancel(
  //  input: CreateDraftRegulationCancelDto,
  //  auth: Auth,
  //) {
  //  return this.draftRegulationCancelApiWithAuth(
  //    auth,
  //  ).draftRegulationCancelControllerCreate({
  //    createDraftRegulationCancelDto: input,
  //  })
  //}

  //updateDraftRegulationCancel(
  //  update: UpdateDraftRegulationCancelDto & { id: string },
  //  auth: Auth,
  //) {
  //  const { id, ...input } = update
  //  return this.draftRegulationCancelApiWithAuth(
  //    auth,
  //  ).draftRegulationCancelControllerUpdate({
  //    updateDraftRegulationCancelDto: input,
  //    id,
  //  })
  //}

  //deleteDraftRegulationCancel(input: { id: string }, auth: Auth) {
  //  return this.draftRegulationCancelApiWithAuth(
  //    auth,
  //  ).draftRegulationCancelControllerDelete({
  //    id: input.id,
  //  })
  //}

  //createDraftRegulationChange(
  //  input: CreateDraftRegulationChangeDto,
  //  auth: Auth,
  //) {
  //  return this.draftRegulationChangeApiWithAuth(
  //    auth,
  //  ).draftRegulationChangeControllerCreate({
  //    createDraftRegulationChangeDto: input,
  //  }) as unknown as DraftRegulationChange
  //}

  //updateDraftRegulationChange(
  //  update: UpdateDraftRegulationChangeDto,
  //  id: string,
  //  auth: Auth,
  //) {
  //  return this.draftRegulationChangeApiWithAuth(
  //    auth,
  //  ).draftRegulationChangeControllerUpdate({
  //    id,
  //    updateDraftRegulationChangeDto: update,
  //  }) as unknown as DraftRegulationChange
  //}

  //deleteDraftRegulationChange(id: string, auth: Auth): Promise<any> {
  //  return this.draftRegulationChangeApiWithAuth(
  //    auth,
  //  ).draftRegulationChangeControllerDelete({
  //    id,
  //  })
  //}
}

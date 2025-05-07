import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Documentation } from '@island.is/nest/swagger'

import { ThjodskraService } from './thjodskra.service'
import { GetPersonDTO, GetPropertyDTO, GetVehicleDTO } from './dto/thjodskra.dto'

@ApiTags('thjodskra')
@Controller({
  path: 'thjodskra',
  version: ['1'],
})
export class ThjodskraController {
  constructor(private readonly thjodskraServive: ThjodskraService) {}
  @Get('/person/:id')
  @Documentation({
    description: 'Retrieves person information by ID.',
    response: { status: 200, type: GetPersonDTO},
  })
  getPerson(@Param('id') id: string): Promise<GetPersonDTO | null> {
    return this.thjodskraServive.getPersonById(id)
  }

  @Get('/property/:id')
  @Documentation({
    description: 'Retrieves property information by ID.',
    response: { status: 200, type: GetPropertyDTO },
  })
  getProperty(@Param('id') id: string): Promise<GetPropertyDTO | null> {
    return this.thjodskraServive.getPropertyById(id)
  }

  @Get('/vehicle/:id')
  @Documentation({
    description: 'Retrieves vehicle information by ID.',
    response: { status: 200, type: GetVehicleDTO },
  })
  getVehicle(@Param('id') id: string): Promise<GetVehicleDTO | null> {
    return this.thjodskraServive.getVehicleById(id)
  }
}

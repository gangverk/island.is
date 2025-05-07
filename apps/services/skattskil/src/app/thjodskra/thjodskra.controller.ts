import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common'
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
    response: { status: 200, type: GetPersonDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the person to retrieve',
        },
      }
    },
  })
  async getPerson(@Param('id') id: string): Promise<GetPersonDTO> {
    try {
      const person = await this.thjodskraServive.getPersonById(id)
      if (!person) {
        throw new NotFoundException(`Person with ID ${id} not found`)
      }
      return person
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Get('/property/:id')
  @Documentation({
    description: 'Retrieves property information by ID.',
    response: { status: 200, type: GetPropertyDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the property to retrieve',
        },
      }
    },
  })
  async getProperty(@Param('id') id: string): Promise<GetPropertyDTO> {
    try {
      const property = await this.thjodskraServive.getPropertyById(id)
      if (!property) {
        throw new NotFoundException(`Property with ID ${id} not found`)
      }
      return property
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }

  @Get('/vehicle/:id')
  @Documentation({
    description: 'Retrieves vehicle information by ID.',
    response: { status: 200, type: GetVehicleDTO },
    request: {
      params: {
        id: {
          type: 'string',
          description: 'ID of the vehicle to retrieve',
        },
      }
    },
  })
  async getVehicle(@Param('id') id: string): Promise<GetVehicleDTO> {
    try {
      const vehicle = await this.thjodskraServive.getVehicleById(id)
      if (!vehicle) {
        throw new NotFoundException(`Vehicle with ID ${id} not found`)
      }
      return vehicle
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An unexpected error occurred')
    }
  }
}
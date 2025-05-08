import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Thjodskra } from './models/thjodskra.model'
import { Fasteignaskra } from './models/fasteignaskra.model'
import { Okutaekjaskra } from './models/okutaekjaskra.model'
import { GetPersonDTO, GetPropertyDTO, GetVehicleDTO } from './dto/thjodskra.dto'
import { Op } from 'sequelize'

@Injectable()
export class ThjodskraService {
  constructor(
    @InjectModel(Fasteignaskra)
    private readonly fasteignaskraModel: typeof Fasteignaskra,
    @InjectModel(Thjodskra)
    private readonly thjodskraModel: typeof Thjodskra,
    @InjectModel(Okutaekjaskra)
    private readonly okutaekjaskraModel: typeof Okutaekjaskra,
  ) {}

  async getPersonById(kennitala: string): Promise<GetPersonDTO | null> {
    const person = await this.thjodskraModel.findOne({ where : { kennitalaId: kennitala } })
    if (!person) {
      return null
    }

    return {
      name: person.name,
      kennitala: person.kennitalaId,
      legalDomicile: person.legalDomicile,
      postalCode: person.postalCode,
      city: person.city,
    }
  }

  async getPropertyById(propertyNumber: string): Promise<GetPropertyDTO | null> {
    const property = await this.fasteignaskraModel.findOne({ where : { propertyNumber } })
    if (!property) {
      return null
    }
    return {
      propertyNumber: property.propertyNumber,
      address: property.address,
      appraisal: property.appraisal,
    }
  }

  async getVehicleById(licensePlateNumber: string): Promise<GetVehicleDTO | null> {
    const vehicle = await this.okutaekjaskraModel.findOne({ where : { licensePlateNumber } })
    if (!vehicle) {
      return null
    }
    return {
      licensePlateNumber: vehicle.licensePlateNumber,
      purchaseYear: vehicle.purchaseYear,
      purchasePrice: vehicle.purchasePrice,
    }
  }
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class GetPersonDTO {
  @ApiProperty({
    description: 'The persons name',
    type: String,
  })
  name!: string

  @ApiProperty({
    description:
      'Social security number of the person also known as kennitala',
    type: String,
  })
  kennitala!: string

  @ApiPropertyOptional({
    description: 'Legal domicile of the person',
    type: String,
  })
  legalDomicile?: string

  @ApiPropertyOptional({
    description: 'Postal code',
    type: String,
  })
  postalCode?: string

  @ApiPropertyOptional({
    description: 'City',
    type: String,
  })
  city?: string
}

export class GetPropertyDTO {
    @ApiProperty({
      description:
        'Property number of the property also known as fastanúmer',
      type: String,
    })
    propertyNumber!: string
  
    @ApiProperty({
      description: 'Address of the property',
      type: String,
    })
    address!: string
  
    @ApiProperty({
      description: 'Current appraisal of the property',
      type: Number,
    })
    appraisal!: number

}

export class GetVehicleDTO {
    @ApiProperty({
      description:
        'The license plate number of the vehicle also known as skráningarnúmer',
      type: String,
    })
    licensePlateNumber!: string
  
    @ApiProperty({
      description: 'Year of purchase of the vehicle',
      type: String,
    })
    purchaseYear!: string
  
    @ApiProperty({
      description: 'Purchase price of the vehicle',
      type: Number,
    })
    purchasePrice!: number
}
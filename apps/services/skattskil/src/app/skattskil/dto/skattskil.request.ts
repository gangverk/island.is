import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class IncomeInputDTO {
  @IsString()
  @ApiProperty({
    description: 'description of the income',
    type: String,
  })
  description!: string

  @IsNumber()
  @ApiProperty({
    description: 'amount of the income',
    type: Number,
  })
  amount!: number

  @IsString()
  @ApiProperty({
    description: 'Name of the payer',
    type: String,
  })
  payer!: string
}
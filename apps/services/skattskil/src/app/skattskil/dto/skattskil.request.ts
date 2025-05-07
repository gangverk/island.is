import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'

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

export class TaxPayerInputDTO {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Tax payer phone number',
    type: String,
  })
  phoneNumber?: string

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Tax payer email address',
    type: String,
  })
  emailAddress?: string

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Tax payer bank account number',
    type: String,
  })
  bankAccountNumber?: string
}
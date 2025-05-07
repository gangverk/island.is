import { ApiProperty } from '@nestjs/swagger'

export class TaxPayerDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  personId!: string

  @ApiProperty({ required: false })
  phone?: string

  @ApiProperty({ required: false })
  email?: string
}

export class TaxReturnDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  taxPayerId!: string

  @ApiProperty()
  fiscalYear!: number

  @ApiProperty()
  completed!: boolean
}

export class IncomeDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  taxReturnId!: string

  @ApiProperty()
  category!: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty()
  amount!: number

  @ApiProperty()
  payer!: string
}

export class AssetsDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  taxReturnId!: string

  @ApiProperty()
  assetId!: string
}

export class LiabilitiesDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  taxReturnId!: string

  @ApiProperty()
  description!: string

  @ApiProperty({ required: false })
  interestPaid?: number

  @ApiProperty()
  amountRemaining!: number
}

export class ResidentialLoanDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  taxReturnId!: string

  @ApiProperty()
  assetId!: string

  @ApiProperty()
  lenderId!: string

  @ApiProperty()
  issueDate!: Date

  @ApiProperty()
  remainingTermYears!: number

  @ApiProperty()
  interestPaidInFiscalYear!: number

  @ApiProperty()
  principalPaidInFiscalYear!: number

  @ApiProperty()
  remainingPrincipal!: number
}
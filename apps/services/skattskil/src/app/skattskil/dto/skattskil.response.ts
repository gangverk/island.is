import { ApiProperty } from '@nestjs/swagger'

export class TaxPayerDTO {
  @ApiProperty()
  id!: string

  @ApiProperty()
  personId!: string

  @ApiProperty()
  name!: string

  @ApiProperty({ required: false })
  address?: string

  @ApiProperty({ required: false })
  phoneNumber?: string

  @ApiProperty({ required: false })
  emailAddress?: string

  @ApiProperty({ required: false })
  bankAccountNumber?: string
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

export class RealEstateDTO {
  @ApiProperty()
  realEstateAssetId!: string

  @ApiProperty()
  address!: string

  @ApiProperty()
  estimatedValue!: number
}

export class VehicleDTO {
  @ApiProperty()
  vehicleAssetId!: string

  @ApiProperty()
  registrationNumber!: string

  @ApiProperty()
  yearOfPurchase!: string

  @ApiProperty()
  purchaseAmount!: number
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
  purchaseYear!: string

  @ApiProperty()
  address!: string

  @ApiProperty()
  loanId!: string

  @ApiProperty()
  lenderId!: string

  @ApiProperty()
  lenderName!: string

  @ApiProperty()
  issueDate!: Date

  @ApiProperty()
  remainingTermYears!: string

  @ApiProperty()
  totalAmountPaidInFiscalYear!: number

  @ApiProperty()
  interestPaidInFiscalYear!: number

  @ApiProperty()
  principalPaidInFiscalYear!: number

  @ApiProperty()
  remainingPrincipal!: number
}
import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'residiential_loan', // Note: There's a typo in the table name (should be 'residential')
  timestamps: false,
})
export class ResidentialLoan extends Model<
  InferAttributes<ResidentialLoan>,
  InferCreationAttributes<ResidentialLoan>
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string

  @ApiProperty()
  @ForeignKey(() => TaxReturn)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'tax_return_id',
  })
  taxReturnId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'asset_id',
  })
  assetId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'lender_id',
  })
  lenderId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'loan_id',
  })
  loanId!: string

  @ApiProperty()
  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    field: 'purchase_year',
  })
  purchaseYear!: number

  @ApiProperty()
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'issue_date',
  })
  issueDate!: Date

  @ApiProperty()
  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    field: 'remaining_term_years',
  })
  remainingTermYears!: number

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'interest_paid_in_fiscal_year',
    get() {
      const rawValue = this.getDataValue('interestPaidInFiscalYear')
  
      return Number(rawValue)
    },
  })
  interestPaidInFiscalYear!: number

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'principal_paid_in_fiscal_year',
    get() {
      const rawValue = this.getDataValue('principalPaidInFiscalYear')
  
      return Number(rawValue)
    },
    
  })
  principalPaidInFiscalYear!: number

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'remaining_principal',
    get() {
      const rawValue = this.getDataValue('remainingPrincipal')
  
      return Number(rawValue)
    },
  })
  remainingPrincipal!: number

  @BelongsTo(() => TaxReturn, 'taxReturnId')
  @ApiProperty({ type: TaxReturn })
  taxReturn?: TaxReturn
}

export type ResidentialLoanAttributes = InferAttributes<ResidentialLoan>
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'residiential_loan',
  timestamps: false,
})
export class ResidentialLoan extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string

  @ForeignKey(() => TaxReturn)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  taxReturnId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  assetId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lenderId!: string

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  issueDate!: Date

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  remainingTermYears!: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amountPaidInFiscalYear!: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  interestComponent!: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  principalComponent!: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  remainingPrincipal!: number

  @BelongsTo(() => TaxReturn)
  taxReturn?: TaxReturn
}
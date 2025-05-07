import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'liabilities',
  timestamps: false,
})
export class Liabilities extends Model<
  InferAttributes<Liabilities>,
  InferCreationAttributes<Liabilities>
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
  })
  description!: string

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    field: 'interest_paid',
  })
  interestPaid?: number

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'amount_remaining',
  })
  amountRemaining!: number

  @BelongsTo(() => TaxReturn, 'taxReturnId')
  @ApiProperty({ type: TaxReturn })
  taxReturn?: TaxReturn
}

export type LiabilitiesAttributes = InferAttributes<Liabilities>
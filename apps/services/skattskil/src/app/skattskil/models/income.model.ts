import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'income',
  timestamps: false,
})
export class Income extends Model<
  InferAttributes<Income>,
  InferCreationAttributes<Income>
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
  category!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amount!: number

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payer!: string

  @BelongsTo(() => TaxReturn, 'taxReturnId')
  @ApiProperty({ type: TaxReturn })
  taxReturn?: TaxReturn
}

export type IncomeAttributes = InferAttributes<Income>
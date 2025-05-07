import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'assets',
  timestamps: false,
})
export class Assets extends Model<
  InferAttributes<Assets>,
  InferCreationAttributes<Assets>
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
    field: 'asset_type',
  })
  assetType!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'asset_id',
  })
  assetId!: string

  @BelongsTo(() => TaxReturn, 'taxReturnId')
  @ApiProperty({ type: TaxReturn })
  taxReturn?: TaxReturn
}

export type AssetsAttributes = InferAttributes<Assets>
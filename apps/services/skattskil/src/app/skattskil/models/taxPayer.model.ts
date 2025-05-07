import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey, HasMany } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'tax_payer',
  timestamps: false,
})
export class TaxPayer extends Model<
  InferAttributes<TaxPayer>,
  InferCreationAttributes<TaxPayer>
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'person_id',
  })
  personId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email?: string

  @HasMany(() => TaxReturn, 'taxPayerId')
  @ApiProperty({ type: TaxReturn, isArray: true })
  taxReturns?: TaxReturn[]
}

export type TaxPayerAttributes = InferAttributes<TaxPayer>
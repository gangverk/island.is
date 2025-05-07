import { Table, Column, Model, DataType, PrimaryKey, HasMany } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'tax_payer',
  timestamps: false,
})
export class TaxPayer extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  personId!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email?: string

  @HasMany(() => TaxReturn)
  taxReturns?: TaxReturn[]
}
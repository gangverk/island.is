import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'income',
  timestamps: false,
})
export class Income extends Model {
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
  category!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amount!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payer!: string

  @BelongsTo(() => TaxReturn)
  taxReturn?: TaxReturn
}
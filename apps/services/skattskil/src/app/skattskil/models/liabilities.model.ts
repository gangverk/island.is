import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'liabilities',
  timestamps: false,
})
export class Liabilities extends Model {
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
  description!: string

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  interestPaid?: number

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amountRemaining!: number

  @BelongsTo(() => TaxReturn)
  taxReturn?: TaxReturn
}
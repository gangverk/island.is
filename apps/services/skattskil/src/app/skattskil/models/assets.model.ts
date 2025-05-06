import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { TaxReturn } from './taxReturn.model'

@Table({
  tableName: 'assets',
  timestamps: false,
})
export class Assets extends Model {
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
  assetType!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  assetId!: string

  @BelongsTo(() => TaxReturn)
  taxReturn?: TaxReturn
}
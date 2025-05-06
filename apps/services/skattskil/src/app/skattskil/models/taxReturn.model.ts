import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript'
import { TaxPayer } from './taxPayer.model'
import { Income } from './income.model'
import { Assets } from './assets.model'
import { Liabilities } from './liabilities.model'
import { ResidentialLoan } from './residentialLoan.model'

@Table({
  tableName: 'tax_return',
  timestamps: false,
})
export class TaxReturn extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string

  @ForeignKey(() => TaxPayer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  taxPayerId!: string

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  fiscalYear!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  completed!: boolean

  @BelongsTo(() => TaxPayer)
  taxPayer?: TaxPayer

  @HasMany(() => Income)
  incomes?: Income[]

  @HasMany(() => Assets)
  assets?: Assets[]

  @HasMany(() => Liabilities)
  liabilities?: Liabilities[]

  @HasMany(() => ResidentialLoan)
  residentialLoans?: ResidentialLoan[]
}
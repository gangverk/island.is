import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
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
export class TaxReturn extends Model<
  InferAttributes<TaxReturn>,
  InferCreationAttributes<TaxReturn>
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string

  @ApiProperty()
  @ForeignKey(() => TaxPayer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'tax_payer_id',
  })
  taxPayerId!: string

  @ApiProperty()
  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    field: 'fiscal_year',
  })
  fiscalYear!: number

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  completed!: boolean

  @BelongsTo(() => TaxPayer)
  @ApiProperty({ type: () => TaxPayer })
  taxPayer?: TaxPayer

  @HasMany(() => Income, 'taxReturnId')
  @ApiProperty({ type: Income, isArray: true })
  incomes?: Income[]

  @HasMany(() => Assets, 'taxReturnId')
  @ApiProperty({ type: Assets, isArray: true })
  assets?: Assets[]

  @HasMany(() => Liabilities, 'taxReturnId')
  @ApiProperty({ type: Liabilities, isArray: true })
  liabilities?: Liabilities[]

  @HasMany(() => ResidentialLoan, 'taxReturnId')
  @ApiProperty({ type: ResidentialLoan, isArray: true })
  residentialLoans?: ResidentialLoan[]
}

export type TaxReturnAttributes = InferAttributes<TaxReturn>
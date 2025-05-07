import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({ 
    tableName: 'thjodskra',
    timestamps: false,
})
export class Thjodskra extends Model<
    InferAttributes<Thjodskra>,
    InferCreationAttributes<Thjodskra>
> {
  @ApiProperty()
  @PrimaryKey
  @Column({
    type: DataType.UUID, 
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    field: 'kennitala_id',
    allowNull: false,
   })
  kennitalaId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    field: 'legal_domicile',
  })
  legalDomicile!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    field: 'postal_code'
  })
  postalCode!: string

  @ApiProperty()
  @Column({ type: DataType.STRING })
  city!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    field: 'bank_account_number',
  })
  bankAccountNumber!: string
}

export type ThjodskraAttributes = InferAttributes<Thjodskra>
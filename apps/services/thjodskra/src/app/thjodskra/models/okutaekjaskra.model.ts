import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({ 
    tableName: 'okutaekjaskra',
    timestamps: false,
})
export class Okutaekjaskra extends Model<
    InferAttributes<Okutaekjaskra>,
    InferCreationAttributes<Okutaekjaskra>
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
    field: 'license_plate_number',
  })
  licensePlateNumber!: string

  @ApiProperty()
  @Column({
    type: DataType.SMALLINT,
    field: 'purchase_year',
   })
  purchaseYear!: string

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    field: 'purchase_price',
    get() {
        const rawValue = this.getDataValue('counter')
  
        // Be explicit about the return type since BIGINT can be handled as a string
        return Number(rawValue)
      },
  })
  purchasePrice!: number
}

export type OkutaekjaskraAttributes = InferAttributes<Okutaekjaskra>
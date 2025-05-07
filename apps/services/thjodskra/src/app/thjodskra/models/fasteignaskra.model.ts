import { ApiProperty } from '@nestjs/swagger'
import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({ 
    tableName: 'fasteignaskra',
    timestamps: false,
})
export class Fasteignaskra extends Model<
    InferAttributes<Fasteignaskra>,
    InferCreationAttributes<Fasteignaskra>
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
    field: 'property_number',
  })
  propertyNumber!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
   })
  address!: string

  @ApiProperty()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    get() {
        const rawValue = this.getDataValue('counter')
  
        // Be explicit about the return type since BIGINT can be handled as a string
        return Number(rawValue)
      },
  })
  appraisal!: number
}

export type FasteignaskraAttributes = InferAttributes<Fasteignaskra>
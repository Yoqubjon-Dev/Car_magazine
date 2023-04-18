import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ManufacturerAttr{
    manufacturer_id: string;
    name: string;
    contact_info: string;
    website: string;
}

@Table({tableName: 'manufacturer'})
export class Manufacturer extends Model<Manufacturer, ManufacturerAttr>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
      })
      manufacturer_id: string;

    @Column({
    type: DataType.STRING,
    unique: true
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    contact_info: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    website: string;
}
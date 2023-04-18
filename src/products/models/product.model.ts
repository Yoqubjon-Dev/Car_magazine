import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ProductAttr{
    product_id: string;
    name: string;
    category_id: string;
    description: string;
    quantity: number;
    price: number;
    manufacturer_id: string
}

@Table({tableName: 'product'})
export class Product extends Model<Product, ProductAttr>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
      })
      product_id: string;

    @Column({
    type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    category_id: string;

    @Column({
        type: DataType.STRING
    })
    description: string;

    @Column({
        type: DataType.INTEGER
    })
    quantity: number;
    
    @Column({
        type: DataType.INTEGER
    })
    price: number;

    @Column({
        type: DataType.STRING
    })
    manufacturer_id: string;
}
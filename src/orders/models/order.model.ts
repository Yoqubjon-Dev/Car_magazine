import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface OrderAttr {
    order_id: string;
    user_id: string;
    product_id: string;
    quantity: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAttr>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    })
    order_id: string;

    @Column({
        type: DataType.STRING,
    })
    user_id: string;

    @Column({
        type: DataType.STRING,
    })
    product_id: string;

    @Column({
        type: DataType.INTEGER,
    })
    quantity: number;
}
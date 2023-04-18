import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface DeliveryAttr{
    delivery_id: string;
    order_id: string;
    fast_shipping: boolean;
    payment_type: string;
    user_id: string;
}

@Table({tableName: 'delievry'})
export class Delivery extends Model<Delivery, DeliveryAttr>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
      })
      delivery_id: string;

    @Column({
    type: DataType.STRING,
    })
    order_id: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    fast_shipping: boolean;

    @Column({
        type: DataType.STRING
    })
    payment_type: string;

    @Column({
        type: DataType.STRING
    })
    user_id: string;
}
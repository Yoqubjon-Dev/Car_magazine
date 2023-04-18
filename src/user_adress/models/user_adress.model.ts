import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface AdressAttr {
    user_adress_id
    user_id: string;
    country: string;
    city: string;
    region: string;
    street: string;
    phone_number: string;
}

@Table({ tableName: 'user_adress' })
export class UserAdress extends Model<UserAdress, AdressAttr>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    })
    user_adress_id: string;
    
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    user_id: string;

    @Column({
        type: DataType.STRING,
    })
    country: string;

    @Column({
        type: DataType.STRING,
    })
    city: string;

    @Column({
        type: DataType.STRING,
    })
    region: string;

    @Column({
        type: DataType.STRING,
    })
    street: string;

    @Column({
        type: DataType.STRING,
    })
    home_number: string;
}
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface CategoryAttr {
    category_id: string;
    name: string;
    description: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    })
    category_id: string;

    @Column({
        type: DataType.STRING,
    })
    name: string;
}
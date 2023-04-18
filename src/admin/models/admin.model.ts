import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  admin_id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  refresh_token: string;
  is_active: boolean;
  activation_link: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  admin_id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  fullname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { User } from './user/models/user.model';
import { Admin } from './admin/models/admin.model';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './products/products.module';
import { Product } from './products/models/product.model';
import { ManufacturerModule } from './manufacturers/manufacturers.module';
import { Manufacturer } from './manufacturers/models/manufacturers.model';
import { OrderModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { UserAdressModule } from './user_adress/user_adress.module';
import { UserAdress } from './user_adress/models/user_adress.model';
import { Order } from './orders/models/order.model';
import { Category } from './categories/models/category.model';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Admin, Product, Manufacturer, UserAdress, Order, Category],
      autoLoadModels: true,
      logging: false,
    }),
    UserModule,
    MailModule,
    AdminModule,
    ProductModule,
    ManufacturerModule,
    OrderModule,
    CategoriesModule,
    UserAdressModule,
    DeliveryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

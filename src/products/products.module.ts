import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductService } from './products.service';
import { Product } from './models/product.model';
import { ProductController } from './products.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Product]), JwtModule.register({})],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }

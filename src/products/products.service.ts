import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4} from "uuid"

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productRepo: typeof Product){}
    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        
        const product = await this.productRepo.create(
          {product_id: uuidv4(), ... createProductDto});
        return product;
    };

    async findAll(){
      const allProducts = await this.productRepo.findAll({include: {all: true}});
      return allProducts;
    }
  
    async getOneProduct(product_id: string): Promise<Product>{
      const product = await this.productRepo.findOne({where: {product_id}});
      return product;
    };

  async updateProduct(product_id: string, updateProductDto: UpdateProductDto){
    const product = await this.productRepo.update(updateProductDto, {
        where: {product_id},
        returning: true
    });
    return product;
  };

  async deleteproduct(product_id: string){
    return this.productRepo.destroy({where: {product_id}});
  };
}

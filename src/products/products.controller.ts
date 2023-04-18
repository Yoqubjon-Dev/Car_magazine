import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: 'Register a new product' })
  @UseGuards(JwtAuthActiveGuard)
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  };

  @ApiOperation({ summary: 'Get all products' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'get a product by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':product_id')
  async getOneProduct(@Param('product_id') product_id: string): Promise<Product> {
    return this.productService.getOneProduct(product_id);
  };

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Put(':product_id')
  async updateProduct(@Param('product_id') product_id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(product_id, updateProductDto);
  };

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':product_id')
  async deleteProduct(@Param('product_id') product_id: string) {
    return this.productService.deleteproduct(product_id);
  };
}

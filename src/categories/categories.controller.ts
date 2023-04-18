import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './models/category.model';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: 'Register a new category' })
  @UseGuards(JwtAuthActiveGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  };

  @ApiOperation({ summary: 'Get all categories' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'get a category by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':category_id')
  async getOneCategory(@Param('category_id') category_id: string): Promise<Category> {
    return this.categoryService.getOneCategory(category_id);
  };

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(JwtAuthActiveGuard)

  @Put(':category_id')
  async updateCategory(@Param('category_id') category_id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(category_id, updateCategoryDto);
  };

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':category_id')
  async deleteCategory(@Param('category_id') category_id: string) {
    return this.categoryService.deleteCategory(category_id);
  };
}

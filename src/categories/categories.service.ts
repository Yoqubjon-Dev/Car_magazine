import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4} from "uuid"
import { or } from 'sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category){}
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>{
        
        const category = await this.categoryRepo.create(
          {category_id: uuidv4(), ... createCategoryDto});
        return category;
    };

    async findAll(){
      const allCategories = await this.categoryRepo.findAll({include: {all: true}});
      return allCategories;
    }
  
    async getOneCategory(category_id: string): Promise<Category>{
      const category = await this.categoryRepo.findOne({where: {category_id}});
      return category;
    };

  async updateCategory(category_id: string, updateCategoryDto: UpdateCategoryDto){
    const category = await this.categoryRepo.update(updateCategoryDto, {
        where: {category_id},
        returning: true
    });
    return category;
  };

  async deleteCategory(category_id: string){
    return this.categoryRepo.destroy({where: {category_id}});
  };
}

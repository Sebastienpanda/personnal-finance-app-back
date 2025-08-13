import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DrizzleService } from '@drizzle/drizzle.service';
import { categories } from '@drizzle/schemas/categories/categories.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoryService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const nameExist = await this.drizzleService.db
            .select()
            .from(categories)
            .where(eq(categories.name, createCategoryDto.name))
            .limit(1);

        if (nameExist.length > 0) {
            throw new ConflictException(
                'Category with this name already exists',
            );
        }

        return this.drizzleService.db.insert(categories).values({
            name: createCategoryDto.name,
            created_by: '08a7c3ec-81c2-4f7e-93c3-bf4f2fa3fac6',
        });
    }

    findAll() {
        return this.drizzleService.db.select().from(categories);
    }

    async findOne(id: string) {
        const data = await this.drizzleService.db
            .select()
            .from(categories)
            .where(eq(categories.id, id))
            .limit(1);

        return data[0];
    }

    update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.drizzleService.db
            .update(categories)
            .set({
                name: updateCategoryDto.name,
            })
            .where(eq(categories.id, id));
    }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { DrizzleService } from '@drizzle/drizzle.service';
import { eq } from 'drizzle-orm';
import { budgets } from '@drizzle/schemas/budgets/budgets.schema';
import { categories } from '@drizzle/schemas/categories/categories.schema';

@Injectable()
export class BudgetsService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async create(createBudgetDto: CreateBudgetDto) {
        const categoryExist = await this.drizzleService.db
            .select()
            .from(budgets)
            .where(eq(budgets.category_id, createBudgetDto.category_id))
            .limit(1);

        if (categoryExist.length > 0) {
            throw new ConflictException('Category already exists');
        }

        return this.drizzleService.db.insert(budgets).values({
            category_id: createBudgetDto.category_id,
            maximum: createBudgetDto.maximum,
            theme: createBudgetDto.theme,
            created_by: '08a7c3ec-81c2-4f7e-93c3-bf4f2fa3fac6',
        });
    }

    findAll() {
        return this.drizzleService.db.select().from(budgets);
    }

    async findOne(id: string) {
        const data = await this.drizzleService.db
            .select({
                budget: {
                    id: budgets.id,
                    maximum: budgets.maximum,
                    theme: budgets.theme,
                    created_at: budgets.created_at,
                },
                category: {
                    name: categories.name,
                },
            })
            .from(budgets)
            .leftJoin(categories, eq(budgets.category_id, categories.id))
            .where(eq(budgets.id, id))
            .limit(1);

        return {
            ...data[0].budget,
            category: data[0].category,
        };
    }
}

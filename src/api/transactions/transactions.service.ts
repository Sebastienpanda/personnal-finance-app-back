import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DrizzleService } from '@drizzle/drizzle.service';
import { budgets } from '@drizzle/schemas/budgets/budgets.schema';
import { eq } from 'drizzle-orm';
import { transactions } from '@drizzle/schemas/transactions/transactions.schema';
import { categories } from '@drizzle/schemas/categories/categories.schema';

@Injectable()
export class TransactionsService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async create(createTransactionDto: CreateTransactionDto) {
        const nameExist = await this.drizzleService.db
            .select()
            .from(transactions)
            .where(eq(transactions.name, createTransactionDto.name))
            .limit(1);

        if (nameExist.length > 0) {
            throw new ConflictException('Transaction already exists');
        }

        return this.drizzleService.db.insert(transactions).values({
            avatar: createTransactionDto.avatar,
            category_id: createTransactionDto.category_id,
            amount: createTransactionDto.amount,
            recurring: createTransactionDto.recurring,
            name: createTransactionDto.name,
            created_by: '08a7c3ec-81c2-4f7e-93c3-bf4f2fa3fac6',
        });
    }

    findAll() {
        return this.drizzleService.db.select().from(transactions);
    }

    async findOne(id: string) {
        const data = await this.drizzleService.db
            .select({
                transaction: {
                    id: transactions.id,
                    avatar: transactions.avatar,
                    name: transactions.name,
                    amount: transactions.amount,
                    recurring: transactions.recurring,
                    created_at: transactions.created_at,
                },
                category: {
                    name: categories.name,
                },
            })
            .from(transactions)
            .leftJoin(categories, eq(transactions.category_id, categories.id))
            .where(eq(transactions.id, id))
            .limit(1);

        return {
            ...data[0].transaction,
            category: data[0].category,
        };
    }
}

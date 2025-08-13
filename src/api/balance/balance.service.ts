import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { DrizzleService } from '@drizzle/drizzle.service';
import { balance } from '@drizzle/schemas/balance/balance.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BalanceService {
    constructor(private readonly drizzleService: DrizzleService) {}

    create(createBalanceDto: CreateBalanceDto) {
        return this.drizzleService.db.insert(balance).values({
            current: createBalanceDto.current,
            created_by: '08a7c3ec-81c2-4f7e-93c3-bf4f2fa3fac6',
        });
    }

    async findOne(id: string) {
        const data = await this.drizzleService.db
            .select()
            .from(balance)
            .where(eq(balance.id, id))
            .limit(1);

        return data[0];
    }

    update(id: string, updateBalanceDto: UpdateBalanceDto) {
        console.log('ok', updateBalanceDto.current);
        return this.drizzleService.db
            .update(balance)
            .set({
                current: updateBalanceDto.current,
            })
            .where(eq(balance.id, id));
    }
}

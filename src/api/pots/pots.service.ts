import { Injectable } from '@nestjs/common';
import { CreatePotDto } from './dto/create-pot.dto';
import { UpdatePotDto } from './dto/update-pot.dto';
import { DrizzleService } from '@drizzle/drizzle.service';
import { pots } from '@drizzle/schemas/pots/pots.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PotsService {
    constructor(private readonly drizzleService: DrizzleService) {}

    create(createPotDto: CreatePotDto) {
        return this.drizzleService.db.insert(pots).values({
            name: createPotDto.name,
            target: createPotDto.target,
            total: createPotDto.total,
            theme: createPotDto.theme,
            created_by: '08a7c3ec-81c2-4f7e-93c3-bf4f2fa3fac6',
        });
    }

    findAll() {
        return this.drizzleService.db.select().from(pots);
    }

    async findOne(id: string) {
        const data = await this.drizzleService.db
            .select()
            .from(pots)
            .where(eq(pots.id, id))
            .limit(1);

        return data[0];
    }

    update(id: string, updatePotDto: UpdatePotDto) {
        return this.drizzleService.db
            .update(pots)
            .set({
                name: updatePotDto.name,
                total: updatePotDto.total,
                theme: updatePotDto.theme,
            })
            .where(eq(pots.id, id));
    }
}

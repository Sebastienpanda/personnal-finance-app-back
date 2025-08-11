import { Inject, Injectable } from '@nestjs/common';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DRIZZLE } from './drizzle.provider';
import type * as schema from './schemas/schema';

export type DrizzleDb = NeonHttpDatabase<typeof schema>;

@Injectable()
export class DrizzleService {
    constructor(
        @Inject(DRIZZLE)
        public readonly db: DrizzleDb,
    ) {
    }
}
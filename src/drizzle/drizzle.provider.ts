import { ConfigService } from '@nestjs/config';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schemas/schema';

export const DRIZZLE = 'DRIZZLE';

export const drizzleProvider = [
    {
        provide: DRIZZLE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const connectionString = configService.get<string>('DATABASE_URL');
            if (!connectionString) {
                throw new Error('❌ DATABASE_URL must be defined');
            }
            const db = drizzle(connectionString, {
                schema,
                logger: true,
            });
            return db as NeonHttpDatabase<typeof schema>;
        },
    },
];

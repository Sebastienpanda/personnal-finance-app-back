import { numeric, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '@drizzle/schemas/application_users/application_users.schema';
import { relations } from 'drizzle-orm';

export const balance = pgTable('balance', {
    id: uuid().defaultRandom().primaryKey(),
    current: numeric({ scale: 2 }).notNull(),
    created_at: timestamp().defaultNow(),
    created_by: uuid()
        .references(() => users.id)
        .notNull(),
});

export const balancesRelations = relations(balance, ({ one }) => ({
    user: one(users, {
        fields: [balance.created_by],
        references: [users.id],
    }),
}));

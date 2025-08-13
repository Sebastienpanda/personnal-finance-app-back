import {
    numeric,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { users } from '@drizzle/schemas/application_users/application_users.schema';
import { relations } from 'drizzle-orm';

export const pots = pgTable('pots', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    target: numeric({ precision: 18, scale: 2 }).notNull(),
    total: numeric({ precision: 18, scale: 2 }).notNull(),
    theme: varchar({ length: 32 }).notNull(),
    created_at: timestamp().defaultNow(),
    created_by: uuid()
        .references(() => users.id)
        .notNull(),
});

export const potsRelations = relations(pots, ({ one }) => ({
    user: one(users, {
        fields: [pots.created_by],
        references: [users.id],
    }),
}));

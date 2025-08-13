import {
    boolean,
    numeric,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { categories } from '@drizzle/schemas/categories/categories.schema';
import { users } from '@drizzle/schemas/application_users/application_users.schema';
import { relations } from 'drizzle-orm';

export const transactions = pgTable('transactions', {
    id: uuid().defaultRandom().primaryKey(),
    avatar: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    category_id: uuid()
        .references(() => categories.id)
        .notNull(),
    amount: numeric({ precision: 18, scale: 2 }).notNull(),
    recurring: boolean().notNull().default(false),
    created_at: timestamp().defaultNow(),
    created_by: uuid()
        .references(() => users.id)
        .notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    category: one(categories, {
        fields: [transactions.category_id],
        references: [categories.id],
    }),
    user: one(users, {
        fields: [transactions.created_by],
        references: [users.id],
    }),
}));

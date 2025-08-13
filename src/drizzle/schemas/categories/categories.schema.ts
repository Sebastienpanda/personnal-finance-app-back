import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from '@drizzle/schemas/application_users/application_users.schema';
import { relations } from 'drizzle-orm';
import { transactions } from '@drizzle/schemas/transactions/transactions.schema';
import { budgets } from '@drizzle/schemas/budgets/budgets.schema';

export const categories = pgTable('categories', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    created_at: timestamp().defaultNow(),
    created_by: uuid()
        .references(() => users.id)
        .notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
    budgets: many(budgets),
}));

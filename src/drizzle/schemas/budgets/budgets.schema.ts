import {
    numeric,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { categories } from '@drizzle/schemas/categories/categories.schema';
import { users } from '@drizzle/schemas/application_users/application_users.schema';
import { relations } from 'drizzle-orm';

export const budgets = pgTable('budgets', {
    id: uuid().defaultRandom().primaryKey(),
    category_id: uuid()
        .references(() => categories.id)
        .notNull(),
    maximum: numeric({ precision: 18, scale: 2 }).notNull(),
    theme: varchar({ length: 32 }).notNull(),
    created_at: timestamp().defaultNow(),
    created_by: uuid()
        .references(() => users.id)
        .notNull(),
});

export const budgetsRelations = relations(budgets, ({ one }) => ({
    category: one(categories, {
        fields: [budgets.category_id],
        references: [categories.id],
    }),
    user: one(users, {
        fields: [budgets.created_by],
        references: [users.id],
    }),
}));

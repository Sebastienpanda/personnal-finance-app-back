import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { categories } from '@drizzle/schemas/categories/categories.schema';
import { transactions } from '@drizzle/schemas/transactions/transactions.schema';
import { budgets } from '@drizzle/schemas/budgets/budgets.schema';
import { pots } from '@drizzle/schemas/pots/pots.schema';
import { balance } from '@drizzle/schemas/balance/balance.schema';

export const roles = pgEnum('role', ['user', 'admin']);

export const users = pgTable('application_users', {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    auth_id: varchar({ length: 255 }).notNull().unique(),
    role: roles().array().default(['user']).notNull(),
    username: varchar({ length: 255 }).notNull(),
    created_at: timestamp().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
    categories: many(categories),
    transactions: many(transactions),
    budgets: many(budgets),
    pots: many(pots),
    balances: many(balance),
}));

import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('application_users', {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    supabase_id: varchar({ length: 255 }).notNull().unique(),
    username: varchar({ length: 255 }).notNull(),
    created_at: timestamp().defaultNow(),
});

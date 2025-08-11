import { DrizzleService } from "@drizzle/drizzle.service";
import { users } from "@drizzle/schemas/application_users/application_users.schema";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

@Injectable()
export class ApplicationUsersService {
	constructor(private readonly drizzleService: DrizzleService) {}

	async findBySupabaseId(supabaseId: string) {
		const user = await this.drizzleService.db.select().from(users).where(eq(users.supabase_id, supabaseId));
		return user[0];
	}
}

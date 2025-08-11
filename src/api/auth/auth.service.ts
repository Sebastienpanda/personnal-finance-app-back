import { DrizzleService } from "@drizzle/drizzle.service";
import { users } from "@drizzle/schemas/application_users/application_users.schema";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";

@Injectable()
export class AuthService {
	constructor(private readonly drizzleService: DrizzleService) {}

	async register(data: CreateUserDto) {
		return this.drizzleService.db.insert(users).values({
			email: data.email,
			supabase_id: data.supabaseId,
			username: data.username,
		});
	}
}

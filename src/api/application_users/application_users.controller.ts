import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { User } from "../types/users";

@Controller("users")
export class ApplicationUsersController {
	@Get("me")
	@HttpCode(HttpStatus.OK)
	@UseGuards(SupabaseAuthGuard)
	async me(@CurrentUser() user: User) {
		return user;
	}
}

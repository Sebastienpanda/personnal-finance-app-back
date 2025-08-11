import { Module } from "@nestjs/common";
import { ApplicationUsersService } from "../application_users/application_users.service";
import { SupabaseService } from "../service/supabase.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	controllers: [AuthController],
	providers: [SupabaseService, AuthService, ApplicationUsersService],
})
export class AuthModule {}

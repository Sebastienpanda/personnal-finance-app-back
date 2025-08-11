import { Module } from "@nestjs/common";
import { SupabaseService } from "../service/supabase.service";
import { ApplicationUsersController } from "./application_users.controller";
import { ApplicationUsersService } from "./application_users.service";

@Module({
	controllers: [ApplicationUsersController],
	providers: [ApplicationUsersService, SupabaseService],
})
export class ApplicationUsersModule {}

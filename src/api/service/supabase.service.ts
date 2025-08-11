import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
	readonly client: SupabaseClient;

	constructor(private readonly configService: ConfigService) {
		this.client = createClient(
			<string>configService.get<string>("SUPABASE_URL"),
			<string>configService.get<string>("SUPABASE_SERVICE_ROLE_KEY"),
		);
	}

	createAuthenticatedClient(userToken: string): SupabaseClient {
		return createClient(
			<string>this.configService.get<string>("SUPABASE_URL"),
			<string>this.configService.get<string>("SUPABASE_SERVICE_ROLE_KEY"),
			{
				global: {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			},
		);
	}

	get supabase() {
		return this.client;
	}
}

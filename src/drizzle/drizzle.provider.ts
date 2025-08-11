import { ConfigService } from "@nestjs/config";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas/schema";

export const DRIZZLE = "DRIZZLE";

export const drizzleProvider = [
	{
		provide: DRIZZLE,
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => {
			const connectionString = configService.get<string>("DATABASE_URL");
			if (!connectionString) {
				throw new Error("❌ DATABASE_URL must be defined");
			}
			const db = drizzle(connectionString, {
				schema,
				logger: true,
			});
			return db as NeonHttpDatabase<typeof schema>;
		},
	},
];

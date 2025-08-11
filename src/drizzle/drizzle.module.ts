import { Global, Module } from "@nestjs/common";
import { DRIZZLE, drizzleProvider } from "./drizzle.provider";
import { DrizzleService } from "./drizzle.service";

@Global()
@Module({
	providers: [...drizzleProvider, DrizzleService],
	exports: [DRIZZLE, DrizzleService],
})
export class DrizzleModule {}

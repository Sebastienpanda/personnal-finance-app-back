import { Module } from '@nestjs/common';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { ApplicationUsersModule } from './api/application_users/application_users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DrizzleModule,
        AuthModule,
        ApplicationUsersModule,
    ],
})
export class AppModule {}

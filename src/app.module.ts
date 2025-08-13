import { Module } from '@nestjs/common';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { ApplicationUsersModule } from './api/application_users/application_users.module';
import { CategoryModule } from './api/category/category.module';
import { BalanceModule } from './api/balance/balance.module';
import { PotsModule } from './api/pots/pots.module';
import { BudgetsModule } from './api/budgets/budgets.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DrizzleModule,
        AuthModule,
        ApplicationUsersModule,
        CategoryModule,
        BalanceModule,
        PotsModule,
        BudgetsModule,
    ],
})
export class AppModule {}

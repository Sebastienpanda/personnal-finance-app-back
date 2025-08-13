import { Module } from '@nestjs/common';
import { ApplicationUsersService } from './application_users.service';

@Module({
    providers: [ApplicationUsersService],
})
export class ApplicationUsersModule {}

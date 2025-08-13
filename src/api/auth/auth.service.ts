import { DrizzleService } from '@drizzle/drizzle.service';
import { users } from '@drizzle/schemas/application_users/application_users.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async register(data: CreateUserDto) {
        const existingUser = await this.drizzleService.db
            .select()
            .from(users)
            .where(eq(users.email, data.email))
            .limit(1);

        if (existingUser.length > 0) {
            throw new ConflictException('Email already Exist');
        }

        return this.drizzleService.db.insert(users).values({
            email: data.email,
            auth_id: data.authId,
            username: data.username,
        });
    }
}

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ApplicationUsersService } from '../application_users/application_users.service';
import { SupabaseService } from '../service/supabase.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
    constructor(
        private readonly applicationUsersService: ApplicationUsersService,
        private readonly supabaseService: SupabaseService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const token = authHeader?.replace('Bearer ', '');

        console.log('token', token);

        if (!token) {
            throw new UnauthorizedException('Token manquant');
        }

        const {
            data: { user },
            error,
        } = await this.supabaseService.supabase.auth.getUser(token);

        if (error || !user) {
            throw new UnauthorizedException(
                'Token invalide ou utilisateur introuvable',
            );
        }

        request.user = await this.applicationUsersService.findBySupabaseId(
            user.id,
        );
        return true;
    }
}

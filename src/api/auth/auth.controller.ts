import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: CreateUserDto, @Res() res: FastifyReply) {
        await this.authService.register(data);

        return res.status(HttpStatus.CREATED).send({
            status: HttpStatus.CREATED,
            message: 'Success Signup',
        });
    }
}

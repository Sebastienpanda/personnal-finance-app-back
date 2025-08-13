import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Res,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { FastifyReply } from 'fastify';

@Controller('balance')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createBalanceDto: CreateBalanceDto,
        @Res() res: FastifyReply,
    ) {
        await this.balanceService.create(createBalanceDto);

        return res.status(HttpStatus.CREATED).send({
            status: HttpStatus.CREATED,
            message: 'Balance created successfully',
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.balanceService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param('id') id: string,
        @Body() updateBalanceDto: UpdateBalanceDto,
        @Res() res: FastifyReply,
    ) {
        await this.balanceService.update(id, updateBalanceDto);

        return res.status(HttpStatus.NO_CONTENT).send({
            status: HttpStatus.NO_CONTENT,
        });
    }
}

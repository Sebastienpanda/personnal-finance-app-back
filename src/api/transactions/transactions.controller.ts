import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FastifyReply } from 'fastify';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Res() res: FastifyReply,
    ) {
        await this.transactionsService.create(createTransactionDto);

        return res.status(HttpStatus.CREATED).send({
            status: HttpStatus.CREATED,
            message: 'Transaction created successfully',
        });
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.transactionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findOne(id);
    }
}

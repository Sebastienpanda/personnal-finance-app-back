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
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { FastifyReply } from 'fastify';

@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createBudgetDto: CreateBudgetDto,
        @Res() res: FastifyReply,
    ) {
        await this.budgetsService.create(createBudgetDto);

        return res.status(HttpStatus.CREATED).send({
            status: HttpStatus.CREATED,
            message: 'Budgets created successfully',
        });
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.budgetsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.budgetsService.findOne(id);
    }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res, } from '@nestjs/common';
import { PotsService } from './pots.service';
import { CreatePotDto } from './dto/create-pot.dto';
import { UpdatePotDto } from './dto/update-pot.dto';
import { FastifyReply } from 'fastify';

@Controller('pots')
export class PotsController {
    constructor(private readonly potsService: PotsService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPotDto: CreatePotDto, @Res() res: FastifyReply) {
        await this.potsService.create(createPotDto);

        return res.status(HttpStatus.CREATED).send({
            status: HttpStatus.CREATED,
            message: 'Pots created successfully',
        });
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.potsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.potsService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Param('id') id: string,
        @Body() updatePotDto: UpdatePotDto,
        @Res() res: FastifyReply,
    ) {
        await this.potsService.update(id, updatePotDto);

        return res.status(HttpStatus.NO_CONTENT).send({
            status: HttpStatus.NO_CONTENT,
        });
    }
}

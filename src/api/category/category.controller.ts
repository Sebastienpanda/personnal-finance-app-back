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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FastifyReply } from 'fastify';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Res() res: FastifyReply,
    ) {
        await this.categoryService.create(createCategoryDto);

        return res.status(HttpStatus.CREATED).send({
            status: HttpStatus.CREATED,
            message: 'Category created successfully',
        });
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Res() res: FastifyReply,
    ) {
        this.categoryService.update(id, updateCategoryDto);

        return res.status(HttpStatus.NO_CONTENT).send({
            status: HttpStatus.NO_CONTENT,
        });
    }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePotDto } from './create-pot.dto';

export class UpdatePotDto extends PartialType(CreatePotDto) {
    name: string;
    theme: string;
    total: string;
}

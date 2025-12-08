import { Controller, Get, Query, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) { }

    @Get()
    async findAll(@Query('q') query: string) {
        return this.doctorsService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.doctorsService.findOne(id);
    }
}

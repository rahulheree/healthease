import { Controller, Get, Query, Param } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalsService: HospitalsService) { }

    @Get()
    async search(
        @Query('q') query: string,
        @Query('city') city: string
    ) {
        return this.hospitalsService.findAll(query, city);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.hospitalsService.findOne(id);
    }
}

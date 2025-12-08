import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    async create(@Body() createLeadDto: any) {
        // In production, validate DTO with class-validator
        return this.leadsService.create(createLeadDto);
    }

    // @UseGuards(AuthGuard) // Implement Guard later
    @Get()
    async findAll() {
        return this.leadsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.leadsService.findOne(id);
    }
}

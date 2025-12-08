import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('stats')
    async getStats() {
        return this.adminService.getStats();
    }

    @Patch('hospital/:id/verify')
    async verifyHospital(
        @Param('id') id: string,
        @Body('verified') verified: boolean
    ) {
        return this.adminService.verifyHospital(id, verified);
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getStats() {
        // Basic stats
        const hospitals = await this.prisma.hospital.count();
        const doctors = await this.prisma.doctor.count();
        const leads = await this.prisma.lead.count();
        const pendingLeads = await this.prisma.lead.count({ where: { status: 'PENDING' } });

        return {
            hospitals,
            doctors,
            leads,
            pendingLeads
        };
    }

    async verifyHospital(id: string, isVerified: boolean) {
        return this.prisma.hospital.update({
            where: { id },
            data: { isVerified }
        });
    }

    async verifyQuote(id: string) {
        // Mark a quote as checked/verified by platform
        // Note: Quote model needs 'verified' field if not present, assume it has 'details'
        const quote = await this.prisma.quote.findUnique({ where: { id } });
        if (!quote) return null;

        // Logic to verify...
        return quote;
    }
}

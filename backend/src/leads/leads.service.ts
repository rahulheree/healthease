import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.LeadCreateInput) {
        return this.prisma.lead.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.lead.findMany({
            include: {
                hospital: true,
                doctor: true,
                package: true,
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.lead.findUnique({
            where: { id },
            include: {
                hospital: true,
                doctor: true,
                package: true,
                quotes: true,
            }
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorsService {
    constructor(private prisma: PrismaService) { }

    async findAll(query: string) {
        return this.prisma.doctor.findMany({
            where: query ? {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { specialty: { contains: query, mode: 'insensitive' } }
                ]
            } : {},
            include: {
                hospital: true,
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.doctor.findUnique({
            where: { id },
            include: {
                hospital: true,
            }
        });
    }
}

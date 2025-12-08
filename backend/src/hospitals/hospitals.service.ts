import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HospitalsService {
    constructor(private prisma: PrismaService) { }

    async findAll(query: string, city: string) {
        return this.prisma.hospital.findMany({
            where: {
                AND: [
                    city ? { city: { contains: city, mode: 'insensitive' } } : {},
                    query ? {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { packages: { some: { name: { contains: query, mode: 'insensitive' } } } }
                        ]
                    } : {}
                ]
            },
            include: {
                packages: true,
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.hospital.findUnique({
            where: { id },
            include: {
                doctors: true,
                packages: true,
            }
        });
    }
}

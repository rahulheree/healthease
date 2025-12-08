import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { DoctorsModule } from './doctors/doctors.module';
import { LeadsModule } from './leads/leads.module';
import { CommonModule } from './common/common.module';
import { AiModule } from './ai/ai.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule, AuthModule, HospitalsModule, DoctorsModule, LeadsModule, CommonModule, AiModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

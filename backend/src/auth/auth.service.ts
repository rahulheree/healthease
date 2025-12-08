import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    // Mock OTP request
    async requestOtp(phone: string) {
        // In prod, call Twilio here.
        console.log(`[Mock-OTP] OTP for ${phone} is 123456`);
        return { message: 'OTP sent (mock: 123456)' };
    }

    // Verify OTP & Login/Register
    async verifyOtp(phone: string, otp: string) {
        if (otp !== '123456') {
            throw new UnauthorizedException('Invalid OTP');
        }

        // Find or create user
        let user = await this.prisma.user.findUnique({ where: { phone } });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    phone,
                    // Placeholder email until user provides it
                    email: `${phone}@placeholder.com`,
                }
            });
        }

        const payload = { sub: user.id, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user,
        };
    }
}

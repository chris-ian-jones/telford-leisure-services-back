import { Module } from '@nestjs/common';
import { ConfigModule } from './../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MemberModule } from './../member/member.module';
import { AuthController } from './auth.controller';
import { ConfigService } from './../config/config.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MemberModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get("WEBTOKEN_SECRET_KEY"),
          signOptions: {
            ...(configService.get("WEBTOKEN_EXPIRATION_TIME")
              ? {
                  expiresIn: Number(
                    configService.get("WEBTOKEN_EXPIRATION_TIME"),
                  ),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: "jwt" })],
})
export class AuthModule {}

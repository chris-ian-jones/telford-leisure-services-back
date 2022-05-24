import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Member } from './member/member.model';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/feedback.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule, 
    MemberModule,
    MongooseModule.forFeature([
      { name: 'Member', schema: Member },
      { name: 'Feedback', schema: Feedback },
    ]),
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService
  ],
})
export class AppModule {}

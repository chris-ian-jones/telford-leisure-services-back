import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.model';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Feedback', schema: Feedback },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}

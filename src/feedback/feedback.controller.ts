import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FeedbackPayloadDto } from './dto/FeedbackPayload.dto';
import { FeedbackService } from './feedback.service';

@Controller('/api/feedback')
export class FeedbackController {

  constructor(
    private readonly feedbackService: FeedbackService
  ) {}

  @Post('new')
  @UsePipes(ValidationPipe)
  async createNewFeedback(@Body() payload:FeedbackPayloadDto) {
    return await this.feedbackService.createNewFeedback(payload);
  }
}

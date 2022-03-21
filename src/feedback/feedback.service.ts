import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFeedback } from './feedback.model';

@Injectable()
export class FeedbackService {
  
  constructor(
    @InjectModel('Feedback') private readonly feedbackModel: Model<IFeedback>,
    ) {}

  async createNewFeedback(payload): Promise<IFeedback> {
    const feedbackToCreate = new this.feedbackModel(payload)
    const createdFeedback = await feedbackToCreate.save();
    return createdFeedback;
  }
}

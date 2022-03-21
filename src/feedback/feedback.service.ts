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
    console.log('payload: ', payload)
    const feedbackToCreate = new this.feedbackModel(payload)
    console.log('feedbackToCreate: ', feedbackToCreate)
    const createdFeedback = await feedbackToCreate.save();
    console.log('createdFeedback: ', createdFeedback)
    return createdFeedback;
  }
}

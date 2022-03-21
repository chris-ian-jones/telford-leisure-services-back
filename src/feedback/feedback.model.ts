import { Schema, Document } from 'mongoose';

export const Feedback = new Schema({
  date: {type: Date, default: Date.now},
  satisfaction: {type: String},
  improvements: {type: String},
})

export interface IFeedback extends Document {
  _id: Schema.Types.ObjectId;
  date: Date;
  satisfaction: string;
  improvements: string;
}

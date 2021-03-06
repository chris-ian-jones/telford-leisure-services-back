import { Schema, Document } from 'mongoose';

export const Member = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true, trim: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  addressLineOne: { type: String, required: true },
  addressLineTwo: { type: String },
  townOrCity: { type: String },
  county: { type: String },
  postcode: { type: String, required: true },
  ethnicity: { type: String, required: true },
  mainCenter: { type: String, required: true },
  membershipType: { type: String, required: true },
  memberNumber: { type: String },
  password: { type: String },
  confirmationCode: { type: String },
  confirmationCodeExpiry: { type: Date }
})

export interface IMember extends Document {
  readonly _id: Schema.Types.ObjectId;
  firstName: String;
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  phone: String,
  addressLineOne: String,
  addressLineTwo: String,
  townOrCity: String,
  county: String,
  postcode: String,
  ethnicity: String,
  mainCenter: String,
  membershipType: String,
  memberNumber: String;
  password: String;
  confirmationCode: String;
  confirmationCodeExpiry: Date,
}

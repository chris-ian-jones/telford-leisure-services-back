import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpPayloadDto } from './../auth/dto/SignUpPayload.dto';
import { IMember } from './member.model';
import { ISignUpReturnBody } from './../auth/auth.service';
import * as randomize from 'randomatic';
import * as bcrypt from "bcryptjs";
import { EmailPayloadDto } from 'src/auth/dto/EmailPayload.dto';
import * as moment from 'moment';
import { sendEmail } from './../utils/sendEmail';
import { ConfirmationCodePayloadDto } from 'src/auth/dto/ConfirmationCodePayload.dto';

@Injectable()
export class MemberService {

  constructor(
    @InjectModel('Member') private readonly memberModel: Model<IMember>,
  ) {}

  get(id: string): Promise<IMember> {
    return this.memberModel.findById(id).exec();
  }

  getByEmail(email: string): Promise<IMember> {
    return this.memberModel.findOne({ email }).exec();
  }

  getByMemberNumber(memberNumber: string): Promise<IMember> {
    return this.memberModel.findOne({ memberNumber }).exec();
  }

  async createMember(payload: SignUpPayloadDto): Promise<ISignUpReturnBody> {
    const member = await this.getByEmail(payload.email);
    if (member) {
      throw new NotAcceptableException(
        "There is an existing account registered with the email address that you have entered. Please use the 'Forgotten your password?' link on the sign in page to reset your password.",
      )
    }
    const newMemberData = this.generateUsernameAndInitialPassword(payload)
    const responsePayload = {
      memberNumber: newMemberData.memberNumber,
      mainCenter: newMemberData.mainCenter
    }
    delete newMemberData['initialPassword'];
    const createdMember = new this.memberModel(newMemberData);
    createdMember.save()
    return responsePayload;
  }

  generateUsernameAndInitialPassword(memberData) {
    const memberNumber = randomize('00000000');
    const initialPassword = randomize('Aa0!', 10);
    const password = bcrypt.hashSync(initialPassword);
    return {
      ...memberData,
      memberNumber,
      initialPassword,
      password
    }
  }

  async generateConfirmationCode(payload:EmailPayloadDto) {
    const member = await this.getByEmail(payload.email);
    if (!member) {
      throw new NotAcceptableException(
        "There is no account registered with the email address that you have entered.",
      )
    }
    const confirmationCode = randomize('A', 6);
    member.confirmationCode = confirmationCode;
    member.confirmationCodeExpiry = moment().add(30, 'minutes').toDate();
    this.sendNewConfirmationCodeEmail(confirmationCode, member.email)
    member.save();
    return {success: 'success'}
  }

  sendNewConfirmationCodeEmail(confirmationCode, memberEmail) {
    const emailSubject = `Confirm your email address - Telford Leisure Services`;
    const emailBody = `
      <span style="font-size: 16px">You have requested a code you can enter on Telford Leisure Services to confirm your email address.</span><br><br>
      <span style="font-size: 16px">Your confirmation code is:</span><br><br><br><br>
      <span style="font-size: 24px"><strong>${confirmationCode}</strong></span><br><br><br><br>
      <span style="font-size: 16px">This code will expire in 30 minutes.</span><br><br>
      <span style="font-size: 16px">If this email account is not shared, and you did not request this code, you need to contact Telford Leisure Services.</span><br><br>
      <span style="font-size: 16px">This is an automatic email - please don’t reply.</span>
    `
    const toEmail = memberEmail
    sendEmail(toEmail, emailSubject, emailBody)
  }

  async validateConfirmationCode(payload:ConfirmationCodePayloadDto) {
    const member = await this.getByEmail(payload.email);
    if (!member) {
      throw new NotAcceptableException(
        "There is no account registered with the email address that you have entered.",
      )
    }
    const confirmCodeExpiry = moment(member.confirmationCodeExpiry);
    const timeNow = moment();
    if (confirmCodeExpiry < timeNow) {
      throw new NotAcceptableException(
        "Confirmation code has expired. Go back and generate a new one",
      )
    }
    if (payload.confirmationCode !== member.confirmationCode) {
      throw new NotAcceptableException(
        "Incorrect confirmation code",
      )
    }
    this.sendMemberNumberEmail(member.firstName, member.lastName, member.memberNumber, member.email);
    const response = {
      email: member.email,
      memberNumber: member.memberNumber
    }
    return response
  }

  sendMemberNumberEmail(firstName, lastName, memberNumber, memberEmail) {
    const emailSubject = `Your recovered Telford Leisure Services member number`;
    const emailBody = `
      <span style="font-size: 16px">Dear ${firstName} ${lastName},</span><br><br>
      <span style="font-size: 16px">We are sending your Telford Leisure Services member number, as requested.</span><br><br>
      <span style="font-size: 16px">Your member number is:</span><br><br><br><br>
      <span style="font-size: 24px"><strong>${memberNumber}</strong></span><br><br><br><br>
      <span style="font-size: 16px"><string>Keep this email</strong> or make a note of your member number. You'll need it to sign in.</span><br><br>
      <span style="font-size: 16px">If you (or anyone sharing this email address) did not request this, then contact Telford Leisure Services.</span><br><br>
      <span style="font-size: 16px">This is an automatic email - please don’t reply.</span>
    `
    const toEmail = memberEmail
    sendEmail(toEmail, emailSubject, emailBody)
  }

}



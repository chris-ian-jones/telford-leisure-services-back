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
    const emailBody = `Confirmation code is ${confirmationCode}`
    const toEmail = memberEmail
    sendEmail(toEmail, emailSubject, emailBody)
  }
}



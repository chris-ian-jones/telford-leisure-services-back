import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpPayloadDto } from './../auth/dto/SignUpPayload.dto';
import { IMember } from './member.model';

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

  async createMember(payload: SignUpPayloadDto): Promise<IMember> {
    const member = await this.getByEmail(payload.email);
    if (member) {
      throw new NotAcceptableException(
        "There is an existing account registered with the email address that you have entered. Please use the 'Forgotten your password?' link on the sign in page to reset your password.",
      )
    }
    const createdMember = new this.memberModel(payload)
    return createdMember.save();
  }
}



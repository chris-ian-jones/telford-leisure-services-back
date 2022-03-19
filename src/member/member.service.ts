import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpPayloadDto } from './../auth/dto/SignUpPayload.dto';
import { IMember } from './member.model';
import { ISignUpReturnBody } from './../auth/auth.service';
import * as randomize from 'randomatic';
import * as bcrypt from "bcryptjs";

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
}



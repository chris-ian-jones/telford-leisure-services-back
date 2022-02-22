import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMember } from './member.model';

@Injectable()
export class MemberService {

  constructor(
    @InjectModel('Member') private readonly memberModel: Model<IMember>,
  ) {}

  get(id: string): Promise<IMember> {
    return this.memberModel.findById(id).exec();
  }
}



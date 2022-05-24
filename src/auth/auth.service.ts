import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { ConfigService } from './../config/config.service';
import { MemberService } from './../member/member.service';
import { SignInPayloadDto } from './dto/SignInPayload.dto';

export interface ITokenReturnBody {
  expires: string;
  expiresPrettyPrint: string;
  token: string;
}

export interface ISignUpReturnBody {
  memberNumber: string;
  mainCenter: string;
}

@Injectable()
export class AuthService {

  private readonly expiration: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly memberService: MemberService,
  ) {
    this.expiration = this.configService.get("WEBTOKEN_EXPIRATION_TIME");
  }

  async createToken({ _id, email }: any): Promise<ITokenReturnBody> {
    return {
      expires: this.expiration,
      expiresPrettyPrint: AuthService.prettyPrintSeconds(this.expiration),
      token: this.jwtService.sign({ _id, email }),
    };
  }

  private static prettyPrintSeconds(time: string): string {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `
      ${hours > 0 ? hours + (hours === 1 ? " hour," : " hours,") : ""} 
      ${minutes > 0 ? minutes + (minutes === 1 ? " minute" : " minutes") : ""} 
      ${seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : ""}
    `;
  }

  async validateMember(payload: SignInPayloadDto): Promise<any> {
    const member = await this.memberService.getByMemberNumber(
      payload.memberNumber,
    );
    if (!member) {
      throw new UnauthorizedException(
        "Incorrect member number or password",
      );
    }
    const validMember = bcrypt.compareSync(payload.password, member.password)
    if (!validMember) {
      throw new UnauthorizedException(
        "Incorrect member number or password",
      );
    }
    return member;
  }

}

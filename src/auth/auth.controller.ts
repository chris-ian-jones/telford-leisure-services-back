import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService, ISignUpReturnBody, ITokenReturnBody } from './auth.service';
import { MemberService } from './../member/member.service';
import { SignInPayloadDto } from './dto/SignInPayload.dto';
import { SignUpPayloadDto } from './dto/SignUpPayload.dto';

@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUpMember(@Body() payload: SignUpPayloadDto): Promise<ISignUpReturnBody> {
    const member = await this.memberService.createMember(payload);
    return member;
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signInMember(@Body() payload: SignInPayloadDto): Promise<ITokenReturnBody> {
    const member = await this.authService.validateMember(payload);
    return await this.authService.createToken(member);
  }
}

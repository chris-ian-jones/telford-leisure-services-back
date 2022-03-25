import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService, ISignUpReturnBody, ITokenReturnBody } from './auth.service';
import { MemberService } from './../member/member.service';
import { SignInPayloadDto } from './dto/SignInPayload.dto';
import { SignUpPayloadDto } from './dto/SignUpPayload.dto';
import { EmailPayloadDto } from './dto/EmailPayload.dto';
import { ResetPasswordPayloadDto } from './dto/ResetPassword.dto';
import { ForgotMemberNumberPayloadDto } from './dto/ForgotMemberNumber.dto';

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

  @Post('/generate-confirmation-code')
  @UsePipes(ValidationPipe)
  async sendConfirmationCodeEmail(@Body() payload: EmailPayloadDto): Promise<any> {
    const response = await this.memberService.generateConfirmationCode(payload);
    return response;
  }

  @Post('/forgot-member-number')
  @UsePipes(ValidationPipe)
  async forgotMemberNumber(@Body() payload: ForgotMemberNumberPayloadDto): Promise<any> {
    const memberNumber = await this.memberService.forgotMemberNumber(payload);
    return memberNumber;
  }

  @Post('/change-password')
  @UsePipes(ValidationPipe)
  async resetPassword(@Body() payload: ResetPasswordPayloadDto): Promise<any> {
    const response = await this.memberService.resetPassword(payload);
    return response;
  }
}

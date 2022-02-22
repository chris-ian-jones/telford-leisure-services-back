import { Controller } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('/api/member')
export class MemberController {
  
  constructor(memberService: MemberService) {}

  
}

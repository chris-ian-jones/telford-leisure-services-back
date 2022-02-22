import { IsNotEmpty, Matches } from "class-validator";

export class SignInPayloadDto {

  @IsNotEmpty({message: 'Member number should not be empty'})
  @Matches(/^[0-9]*$/, {message: 'Member number should only contain numbers'})
  memberNumber: string;

  @IsNotEmpty({message: 'Password should not be empty'})
  password: string;

}
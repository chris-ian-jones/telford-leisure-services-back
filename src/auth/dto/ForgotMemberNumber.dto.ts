import { IsNotEmpty } from "class-validator";

export class ForgotMemberNumberPayloadDto {

  @IsNotEmpty({message: 'Email should not be empty'})
  email: string;
  
  @IsNotEmpty({message: 'Confirmation code should not be empty'})
  confirmationCode: string;

}

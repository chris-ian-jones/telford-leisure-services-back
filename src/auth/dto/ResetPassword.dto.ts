import { IsNotEmpty } from "class-validator";

export class ResetPasswordPayloadDto {

  @IsNotEmpty({message: 'Email should not be empty'})
  email: string;
  
  @IsNotEmpty({message: 'Confirmation code should not be empty'})
  confirmationCode: string;

  @IsNotEmpty({message: 'Password should not be empty'})
  password: string;

}
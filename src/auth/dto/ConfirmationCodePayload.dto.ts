import { IsNotEmpty } from "class-validator";

export class ConfirmationCodePayloadDto {

  @IsNotEmpty({message: 'Email should not be empty'})
  email: string;
  
  @IsNotEmpty({message: 'Confirmation code should not be empty'})
  confirmationCode: string;

}
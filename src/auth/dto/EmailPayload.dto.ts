import { IsNotEmpty } from "class-validator";

export class EmailPayloadDto {

  @IsNotEmpty({message: 'Email should not be empty'})
  email: string;

}
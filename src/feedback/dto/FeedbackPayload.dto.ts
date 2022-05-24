import { IsNotEmpty, IsOptional } from "class-validator";

export class FeedbackPayloadDto {

  @IsOptional()
  improvements: string;

  @IsNotEmpty({message: 'Satisfaction should not be empty'})
  satisfaction: string;

}

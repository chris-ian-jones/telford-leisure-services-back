import { IsNotEmpty, Matches } from "class-validator";

export class SignUpPayloadDto {

  title: string;

  @IsNotEmpty({message: 'Forename should not be empty'})
  @Matches(/^[a-zA-Z ]+$/, {message: 'Forename should only contain letters'})
  forename: string;

  @IsNotEmpty({message: 'Surname should not be empty'})
  @Matches(/^[a-zA-Z ]+$/, {message: 'Surname should only contain letters'})
  surname: string;

  @IsNotEmpty({message: 'Date of birth should not be empty'})
  dateOfBirth: string;

  @IsNotEmpty({message: 'Gender should not be empty'})
  gender: string;

  @IsNotEmpty({message: 'Email should not be empty'})
  email: string;

  phone: string;

  @IsNotEmpty({message: 'Address line 1 should not be empty'})
  addressLineOne: string;

  addressLineTwo: string;

  townOrCity: string;

  county: string;

  @IsNotEmpty({message: 'Postcode should not be empty'})
  postcode: string;

  @IsNotEmpty({message: 'Ethnicity should not be empty'})
  ethnicity: string;

  @IsNotEmpty({message: 'Main leisure center should not be empty'})
  mainCenter: string;

  @IsNotEmpty({message: 'Membership type should not be empty'})
  membershipType: string;

}
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class PayloadDto {

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date
}
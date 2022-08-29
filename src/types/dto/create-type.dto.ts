import { IsString, IsUppercase } from "class-validator";

export class CreateTypeDto {
  @IsString({message: "Должно быть строковым"})
  readonly name: string;
}
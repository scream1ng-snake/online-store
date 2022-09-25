import { IsString, IsUppercase } from "class-validator";

export class UpdateTypeDto {
  @IsString({message: "Должно быть строковым"})
  readonly name: string;
}
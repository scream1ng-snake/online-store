import { IsString, IsUppercase } from "class-validator";

export class CreateRoleDto {
  @IsUppercase({message: "Должно быть в верхнем регистре, например: ADMIN"})
  @IsString({message: "Должно быть строковым"})
  readonly value: string;

  @IsString({message: "Должно быть строковым"})
  readonly description: string;
}
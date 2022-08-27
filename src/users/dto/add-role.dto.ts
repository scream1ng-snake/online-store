import { IsNumber, IsString, IsUppercase } from "class-validator";

export class AddRoleDto {
  @IsUppercase({message: "Значение должно быть в верхнем регистре"})
  @IsString({message: "Поле должно быть строкой"})
  readonly value: string;
  
  @IsNumber({}, {message: "Должен быть числовым значением"})
  readonly userId: number;
}
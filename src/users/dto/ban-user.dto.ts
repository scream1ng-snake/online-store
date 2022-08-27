import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @IsNumber({}, {message: "Должно быть числовым значением"})
  readonly userId: number;
  
  @IsString({message: "Должно быть строкой"})
  readonly banReason: string;
}
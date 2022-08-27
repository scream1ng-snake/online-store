import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
  @IsString({message: "E-mail должен быть строкой"})
  @IsEmail({}, {message: "Некоректный почтовый адрес"})
  readonly email: string;
  
  @IsString({message: "Пароль должен быть строкой"})
  @Length(4, 10, {message: "Пароль должен быть от 4 до 10 символов"})
  readonly password: string;

}
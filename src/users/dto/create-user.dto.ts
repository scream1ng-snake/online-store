import { Blob } from "buffer";
import { IsEmail, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
  @IsString({message: "E-mail должен быть строкой"})
  @IsEmail({}, {message: "Некоректный почтовый адрес"})
  readonly email: string;
  
  @Length(4, 10, {message: "Пароль должен быть от 4 до 10 символов"})
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.'})
  readonly password: string;

  @IsString({message: "Никнейм должен быть строкой"})
  @Length(4, 20, {message: "Никнейм пользоввателя должен быть от 4 до 20 символов"})
  readonly username: string;

  readonly image?: Blob;
  
  readonly activationLink?: string;
}